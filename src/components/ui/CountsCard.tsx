import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid #40404020;
  border-radius: 14px;
  display: flex;
  gap: 6px;
  box-shadow: 1px 6px 20px 0px #007aff15;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #007aff;
`;

const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  color: #404040;
`;

const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Desc = styled.div`
  font-size: 14px;
  color: #4d4c4c90;
  margin-bottom: 6px;
`;

interface Counts {
  title: string;
  description: string;
  value: number;
  unit: string;
}

const CountsCard = ({ title, description, value, unit }: Counts) => {
  return (
    <Card>
      <Left>
        <Title>{title}</Title>
        <Value>
          {value}
          <Unit>{unit}</Unit>
        </Value>
        <Desc>{description}</Desc>
      </Left>
    </Card>
  );
};

export default CountsCard;
