import styled from "styled-components";

export const GraphPageContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  gap: 30px;
  padding: 20px 20px 90px 20px;
  .notice {
    font-size: 0.6rem;
    color: #999;
    text-align: center;
  }
`
export const GraphPageBtn = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 2;
  justify-content: center;
  padding: 10px 0 0 0;
  svg {
    padding: 10px;
    font-size: 0.8rem;
    cursor: pointer;
    fill: ${props => props.theme.brown};
  }
  .year {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    p {
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.pink2};
    }
  }
  .month {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    p {
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.pink2};
    }
  }

`
export const GraphBtn = styled.div`
  display: flex;
  justify-content: center;
  svg {
    padding: 10px;
    font-size: 0.8rem;
    cursor: pointer;
    fill: ${props => props.theme.brown};
  }
  .year {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    p {
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.pink2};
    }
  }
  .month {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    p {
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.pink2};
    }
  }

`
export const GraphModalContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 300px;
  p.sub_title {
    position: absolute;
    top: 40px;
    right: 20px;
    margin: 10px 0 0;
    text-align: center;
    color: #666;
    font-size: 0.6rem;
    letter-spacing: -0.04rem;
  }
  p.empty_sub {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #666;
    font-size: 1.4rem;
    letter-spacing: 0.04rem;
    color: ${props => props.theme.pink2};
  }
`
export const GraphAttendContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 20px;
  height: 300px;
  p.sub_title {
    position: absolute;
    top: 40px;
    right: 20px;
    margin: 10px 0 0;
    text-align: center;
    color: #666;
    font-size: 0.6rem;
    letter-spacing: -0.04rem;
  }
  p.empty_sub {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #666;
    font-size: 1.4rem;
    letter-spacing: 0.04rem;
    color: ${props => props.theme.pink2};
  }
`

export const BasicStatsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 20px;
  p.title {
    width: 100%;
    text-align: center;
    font-size: 0.75rem;
    font-weight: bold;
    color: #666;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content_title {
      font-size: 0.8rem;
      font-weight: bold;
      color: #333;
    }
    .content_body {
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 1rem;
      color: ${props => props.theme.green};
      .add_text {
        font-size: 0.6rem;
      }
    }
  }

`