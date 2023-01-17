import styled from "@emotion/styled"

const NeuBox = styled.div`
  border-radius: ${props => props.radius ?? "10px"};
  background: ${props => props.background ?? "#1e1e1e"};
  padding: ${props => props.padding ?? "12px"};
  /* box-shadow: 15px 15px 30px #151515, -15px -15px 30px #272727; */
  box-shadow: 10px 10px 20px #121212, -10px -10px 20px #2a2a2a;
`

export default NeuBox
