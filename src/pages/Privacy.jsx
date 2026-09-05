import { Container, Column } from '../components/Container'
import { site } from '../data/site'

export function Privacy() {
  return (
    <Container className="section legal-page" boxed>
      <Column>
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p>
          Contour Lash and Brow (ABN {site.abn}) respects your privacy and handles personal information in line with the
          Australian Privacy Principles in the Privacy Act 1988 (Cth).
        </p>
        <h2>What we collect</h2>
        <p>
          We may collect your name, phone number, email address, appointment details, patch-test records, and any notes
          you share about sensitivities, eye health, or preferred lash styles. If you book online through Acuity
          Scheduling, that platform also collects the details needed to create your booking.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your information to book and confirm appointments, provide treatments, send appointment reminders,
          process payments, and respond to enquiries. We do not sell your personal information.
        </p>
        <h2>Who we share it with</h2>
        <p>
          We may share information with our online booking provider, payment processors, and professional advisers when
          required. We may also disclose information if the law requires us to do so.
        </p>
        <h2>Storage and security</h2>
        <p>
          Information is stored in our booking system and salon records. We take reasonable steps to protect it from
          misuse, interference, loss, and unauthorised access.
        </p>
        <h2>Access and questions</h2>
        <p>
          You can ask to access or correct your personal information, or raise a privacy concern, by emailing{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> or calling <a href={site.phoneHref}>{site.phone}</a>.
        </p>
        <p>This policy may be updated from time to time. The latest version will always be available on this page.</p>
      </Column>
    </Container>
  )
}
