export interface Teams {
  ID: number;
  Name: string;
  Code: string;
  Joins: Join[];
}

interface Join {
  ID: number;
  Email: string;
  Profile: string;
  UserName: string;
  Description: string;
  Link_1: string;
  Link_2: string;
  Link_3: string;
  Rainbow:boolean
}
