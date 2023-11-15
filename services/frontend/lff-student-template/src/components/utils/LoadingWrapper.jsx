import { Space, Spin, Typography } from "antd"
const { Text } = Typography;

export default function LoadingWrapper({ isLoading, children }) {
  return (
    <>
    {
      <Spin
        size="large"
        spinning={ isLoading != null ? isLoading : false }
        delay={500}
        style={{
          minHeight: 'calc(100vh / 2)'
        }}
      >
        {children}
      </Spin>
    }
    </>
  )
}
