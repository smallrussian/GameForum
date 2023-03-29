import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const Spacer = ({ children } : Props) => (
  <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
    <div className=" space-y-4  sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-1">
      {children}
    </div>
  </div>
)

export default Spacer
