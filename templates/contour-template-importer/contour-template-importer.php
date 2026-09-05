<?php
/**
 * Plugin Name: Contour Lash Template Importer
 * Description: Imports Contour Lash and Brow Elementor container templates, images, and pages. Use this instead of the Elementor editor folder upload (Elementor 4.x blocks that).
 * Version: 1.1.0
 * Requires Plugins: elementor
 * Author: Contour Lash and Brow
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CONTOUR_IMPORTER_DIR', plugin_dir_path(__FILE__));
define('CONTOUR_IMPORTER_MEDIA_PLACEHOLDER', 'https://contourlashandbrow.com.au/wp-content/uploads/contour');

register_activation_hook(__FILE__, 'contour_importer_activate');

function contour_importer_activate() {
    if (!did_action('elementor/loaded') && !class_exists('\Elementor\Plugin')) {
        return;
    }
    contour_importer_run(false);
}

add_action('admin_menu', function () {
    add_management_page(
        'Contour Templates',
        'Contour Templates',
        'manage_options',
        'contour-templates',
        'contour_importer_admin_page'
    );
});

add_action('admin_notices', function () {
    if (!current_user_can('manage_options')) {
        return;
    }
    if (isset($_GET['contour_imported'])) {
        echo '<div class="notice notice-success is-dismissible"><p>Contour templates imported. Open <strong>Templates → Saved Templates</strong> and <strong>Pages</strong>. Then add Header/Footer in ElementsKit.</p></div>';
    }
});

add_action('admin_init', function () {
    if (!current_user_can('manage_options')) {
        return;
    }
    if (isset($_POST['contour_import_templates']) && check_admin_referer('contour_import_templates')) {
        contour_importer_run(true);
        wp_safe_redirect(admin_url('tools.php?page=contour-templates&contour_imported=1'));
        exit;
    }
});

function contour_importer_admin_page() {
    $ok = get_option('contour_templates_imported');
    echo '<div class="wrap"><h1>Contour Lash Templates</h1>';
    echo '<p>Elementor 4.x cannot import JSON from the editor folder icon. Use this button instead. It also copies salon images into <code>wp-content/uploads/contour/</code>.</p>';
    echo '<form method="post">';
    wp_nonce_field('contour_import_templates');
    submit_button($ok ? 'Re-import templates' : 'Import templates now', 'primary', 'contour_import_templates');
    echo '</form>';
    if ($ok) {
        echo '<p>Last import: ' . esc_html($ok) . '</p>';
        echo '<ol>';
        echo '<li>Turn off the CMP Coming Soon plugin when you are ready to show the site.</li>';
        echo '<li>ElementsKit → Header Footer → create Header (Entire Site) → Edit with Elementor → Add Template → My Templates → insert <strong>Contour — Header</strong>.</li>';
        echo '<li>Repeat for <strong>Contour — Footer</strong>.</li>';
        echo '<li>Settings → Reading → set Homepage to <strong>Home</strong>.</li>';
        echo '</ol>';
    }
    echo '</div>';
}

function contour_importer_media_url() {
    $uploads = wp_upload_dir();
    return trailingslashit($uploads['baseurl']) . 'contour';
}

function contour_importer_copy_assets() {
    $uploads = wp_upload_dir();
    $dest = trailingslashit($uploads['basedir']) . 'contour';
    if (!wp_mkdir_p($dest)) {
        return [];
    }
    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    $src = CONTOUR_IMPORTER_DIR . 'assets';
    $map = [];
    if (!is_dir($src)) {
        return $map;
    }
    foreach (scandir($src) as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        $from = trailingslashit($src) . $file;
        $to = trailingslashit($dest) . $file;
        copy($from, $to);
        $url = trailingslashit($uploads['baseurl']) . 'contour/' . $file;
        $id = contour_importer_attachment_id($to, $file, $url);
        $map[$file] = [
            'id' => $id ? (int) $id : '',
            'url' => $id ? wp_get_attachment_url($id) : $url,
        ];
    }
    return $map;
}

function contour_importer_attachment_id($path, $filename, $url) {
    global $wpdb;
    $existing = $wpdb->get_var($wpdb->prepare(
        "SELECT ID FROM $wpdb->posts WHERE post_type = 'attachment' AND guid LIKE %s LIMIT 1",
        '%' . $wpdb->esc_like($filename)
    ));
    if ($existing) {
        return (int) $existing;
    }
    $filetype = wp_check_filetype($filename);
    $id = wp_insert_attachment([
        'post_mime_type' => $filetype['type'],
        'post_title' => sanitize_file_name(pathinfo($filename, PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
        'guid' => $url,
    ], $path);
    if (!is_wp_error($id)) {
        wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $path));
        return (int) $id;
    }
    return 0;
}

function contour_importer_apply_media(&$node, $map) {
    if (!is_array($node)) {
        return;
    }
    foreach ($node as $key => &$value) {
        if (in_array($key, ['image', 'background_image'], true) && is_array($value) && !empty($value['url'])) {
            $base = basename(parse_url($value['url'], PHP_URL_PATH));
            if (isset($map[$base])) {
                $value['url'] = $map[$base]['url'];
                $value['id'] = $map[$base]['id'];
                $value['alt'] = isset($value['alt']) ? $value['alt'] : '';
            }
        } elseif ($key === 'carousel' && is_array($value)) {
            foreach ($value as &$slide) {
                if (!empty($slide['url'])) {
                    $base = basename(parse_url($slide['url'], PHP_URL_PATH));
                    if (isset($map[$base])) {
                        $slide['url'] = $map[$base]['url'];
                        $slide['id'] = $map[$base]['id'];
                    }
                }
            }
        } elseif (is_array($value)) {
            contour_importer_apply_media($value, $map);
        }
    }
}

function contour_importer_load_json($file, $media_map = []) {
    $path = CONTOUR_IMPORTER_DIR . 'json/' . $file;
    $raw = file_get_contents($path);
    $raw = str_replace(CONTOUR_IMPORTER_MEDIA_PLACEHOLDER, contour_importer_media_url(), $raw);
    $data = json_decode($raw, true);
    if (!is_array($data) || empty($data['content'])) {
        return new WP_Error('json', 'Invalid template: ' . $file);
    }
    if ($media_map) {
        contour_importer_apply_media($data, $media_map);
    }
    return $data;
}

function contour_importer_find_library($title) {
    $found = get_posts([
        'post_type' => 'elementor_library',
        'title' => $title,
        'numberposts' => 1,
        'post_status' => 'any',
    ]);
    return $found ? $found[0] : null;
}

function contour_importer_save_library($data) {
    $title = $data['title'];
    $existing = contour_importer_find_library($title);
    $postarr = [
        'post_title' => $title,
        'post_status' => 'publish',
        'post_type' => 'elementor_library',
    ];
    if ($existing) {
        $postarr['ID'] = $existing->ID;
        $id = wp_update_post($postarr);
    } else {
        $id = wp_insert_post($postarr);
    }
    if (is_wp_error($id) || !$id) {
        return $id;
    }
    update_post_meta($id, '_elementor_edit_mode', 'builder');
    update_post_meta($id, '_elementor_template_type', 'page');
    update_post_meta($id, '_elementor_data', wp_slash(wp_json_encode($data['content'])));
    update_post_meta($id, '_elementor_page_settings', !empty($data['page_settings']) ? $data['page_settings'] : []);
    update_post_meta($id, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.21.0');
    if (taxonomy_exists('elementor_library_type')) {
        wp_set_object_terms($id, 'page', 'elementor_library_type');
    }
    return $id;
}

function contour_importer_save_page($title, $slug, $data) {
    $existing = get_page_by_path($slug);
    $postarr = [
        'post_title' => $title,
        'post_name' => $slug,
        'post_status' => 'publish',
        'post_type' => 'page',
    ];
    if ($existing) {
        $postarr['ID'] = $existing->ID;
        $id = wp_update_post($postarr);
    } else {
        $id = wp_insert_post($postarr);
    }
    if (is_wp_error($id) || !$id) {
        return $id;
    }
    update_post_meta($id, '_elementor_edit_mode', 'builder');
    update_post_meta($id, '_elementor_template_type', 'wp-page');
    update_post_meta($id, '_elementor_data', wp_slash(wp_json_encode($data['content'])));
    update_post_meta($id, '_elementor_page_settings', !empty($data['page_settings']) ? $data['page_settings'] : []);
    update_post_meta($id, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.21.0');
    return $id;
}

function contour_importer_run($force) {
    if (!class_exists('\Elementor\Plugin')) {
        return new WP_Error('elementor', 'Activate Elementor first.');
    }
    $media_map = contour_importer_copy_assets();

    $map = [
        'contour-header.json' => ['library' => true],
        'contour-footer.json' => ['library' => true],
        'contour-home.json' => ['page' => ['Home', 'home']],
        'contour-services.json' => ['page' => ['Services', 'services']],
        'contour-contact.json' => ['page' => ['Contact', 'contact']],
        'contour-privacy-policy.json' => ['page' => ['Privacy Policy', 'privacy-policy']],
    ];

    foreach ($map as $file => $targets) {
        $data = contour_importer_load_json($file, $media_map);
        if (is_wp_error($data)) {
            continue;
        }
        contour_importer_save_library($data);
        if (!empty($targets['page'])) {
            contour_importer_save_page($targets['page'][0], $targets['page'][1], $data);
        }
    }

    if (class_exists('\Elementor\Plugin')) {
        \Elementor\Plugin::$instance->files_manager->clear_cache();
    }

    update_option('contour_templates_imported', current_time('mysql'));
    return true;
}
