import { Spin } from "antd"

export default function LoadingWrapper({ isLoading, children }) {
  return (
    <>
    {
      isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large"/>
        </div>
      ) : (
        <>
          {children}
        </>
      )
    }
    </>
  )
}
