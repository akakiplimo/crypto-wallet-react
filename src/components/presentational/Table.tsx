import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledThead = styled.thead`
  background-color: #656565;
`;

const StyledTbody = styled.tbody`
  background-color: #818080;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #656565;
  }
`;

const StyledTh = styled.th`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const StyledTd = styled.td`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export { StyledTable, StyledThead, StyledTbody, StyledTr, StyledTh, StyledTd };