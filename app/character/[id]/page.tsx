import Footer from '../../../components/Footer'
import Navigation from '../../../components/Navbar'
import DetailCharacterModule from '../../../modules/characters/detail'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

const DetailCharacterPage = ({ params }: Props) => {
  return (
    <>
      <Navigation />
      <DetailCharacterModule params={params} />
      <Footer />
    </>
  )
}

export default DetailCharacterPage
