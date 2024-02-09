import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
  background-color: #1f1f1f;
`;

const StyledThead = styled.thead`
  background-color: #333333;
`;

const StyledTbody = styled.tbody`
  background-color: #1f1f1f;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #333333;
  }
`;

const StyledTh = styled.th`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #444444;
`;

const StyledTd = styled.td`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #444444;
`;

export { StyledTable, StyledThead, StyledTbody, StyledTr, StyledTh, StyledTd };