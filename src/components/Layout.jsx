import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <div className="site-wrap">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  )
}
