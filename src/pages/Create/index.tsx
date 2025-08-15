// Components
import Layout from "@/components/layout/Layout"
import * as Components from './components'

function Create() {

  return (
    <Layout>
      <div className="my-10 xl:w-3/5 lg:mx-auto">
        <Components.CreateContainer />
      </div>
    </Layout>
  )
}

export default Create