export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Username",
    headerName: "Tên đăng nhập",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 330,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const recipeColumns = [
  { field: "id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Tên món ăn",
    width: 250,
  },
  {
    field: "duration",
    headerName: "Thời gian",
    width: 150,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const categoryColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên danh mục",
    width: 350,
  },
];

