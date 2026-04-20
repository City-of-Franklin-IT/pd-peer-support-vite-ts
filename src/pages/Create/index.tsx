// Components
import ErrorBoundary from '@/components/error/ErrorBoundary'
import * as Components from './components'

function Create() {

  return (
    <ErrorBoundary href={'/support'}>
      <div className="my-10 xl:w-3/5 lg:mx-auto">
        <Components.CreateContainer />
      </div>
    </ErrorBoundary>
  )
}

export default Create