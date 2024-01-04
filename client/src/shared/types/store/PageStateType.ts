export interface PageStateType {
  postCurrentPage: number;
  postPageSize: number;
  setPostCurrentPage: (postCurrentPage: number) => void;
  setPostPageSize: (postPageSize: number) => void;
}
