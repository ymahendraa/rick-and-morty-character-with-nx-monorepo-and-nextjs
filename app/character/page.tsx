import Footer from '../../components/Footer'
import Navigation from '../../components/Navbar'
import CharacterModule from '../../modules/characters'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Navigation />
      <CharacterModule />
      <Footer />
    </>
  )
}
