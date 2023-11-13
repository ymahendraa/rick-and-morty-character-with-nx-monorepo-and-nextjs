import Footer from '../../../components/Footer'
import Navigation from '../../../components/Navbar'
import DetailLocationModule from '../../../modules/locations/detail'
import { Metadata } from 'next'

type Props = {
  params: { name: string }
}

const DetailLocationPage = ({ params }: Props) => {
  return (
    <>
      <Navigation />
      {/* <DetailCharacterModule params={params} /> */}
      <DetailLocationModule params={params} />
      <Footer />
    </>
  )
}

export default DetailLocationPage
