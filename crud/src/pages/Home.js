import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import "./Home.css";

const Home = () => {
  const { UserData, setUserData } = useContext(UserContext);
  const Id = Cookies.get("userId");
  const token = Cookies.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [maxCount, setmaxCount] = useState();
  const [view, setView] = useState(false);
  const [search, setSearch] = useState("");
  const [Exp, setExp] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
    imageFile: [],
  });

  const [expenses, setExpenses] = useState([]);
  const Allexp = () => {
    axios
      .get(`http://localhost:5000/api/expense/all/${Id}`)
      .then((res) => {
        setExp(res.data);
        console.log(res.data);
        console.log(Exp);
      })
      .catch((e) => {
        console.log("download errore", e.message);
      });
  };
  const fetchExpenses = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/expense/user/${Id}`, {
        params: { page: pageCount },
      })
      .then((res) => {
        setExpenses(res.data.expenses);
        setLoading(false);
        console.log("expenses", expenses);

        setmaxCount(res.data.maxCount);
      })
      .catch((e) => {
        console.log("error", e);
        setError("Failed to fetch expenses");
      });
  };

  useEffect(() => {
    if (Id) {
      fetchExpenses();
      Allexp();
    }
  }, [Id, pageCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const fd = new FormData();
    fd.append("category", formData.category);
    fd.append("date", formData.date);
    fd.append("description", formData.description);
    fd.append("imageFile", formData.imageFile);
    fd.append("name", formData.name);
    try {
      if (editingId) {
        const res = await axios.put(
          `http://localhost:5000/api/expense/update/${editingId}`,
          fd,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          toast.success("Expense updated successfully");
        }else {
        toast.error(res.data.message || "Create failed");
      }
        setEditingId(null);
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/expense/create`,
          fd,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          toast.success("Form submitted successfully");
        }else{
          toast.error(res.data.message || "Update failed");
        }
      }
      fetchExpenses();
      setFormData({
        name: "",
        description: "",
        category: "",
        date: "",
      });
      setView(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message); 
    } else {
      toast.error("Unexpected error occurred");
    }
    console.error("Error saving expense:", err);
  }
  };

  const handleClear = () => {
    setExpenses([]);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/expense/delete/${id}`
      );
      if (res.status === 200) {
        fetchExpenses();
      }
    } catch (err) {
      console.error("Error deleting expense", err);
    }
  };

  const handleleft = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  };

  const handleright = () => {
    const totalPages = Math.ceil(maxCount / 5);
    if (pageCount < totalPages) {
      setPageCount(pageCount + 1);
    }
  };

  const handleClose = () => setView(false);

  // const filteredExpenses = Exp.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase()) ||
  //     item.category.toLowerCase().includes(search.toLowerCase())
  // );
  const filteredExpenses = Exp.filter(
    (item) =>
      (item.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (item.category?.toLowerCase() || "").includes(search.toLowerCase())
      
  );

  const headers = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Category", key: "category" },
    { label: "Date", key: "date" },
    {label:"imageFile", key:"imageFile"}
  ];
  const [editingId, setEditingId] = useState(null);
  const dataToRender = search ? filteredExpenses : expenses;



  console.log("userData: ",UserData);
  
  return (
    <div className="home-container">
      {!view && (
        <button className="btn primary" onClick={() => setView(true)}>
          View Expenses Form
        </button>
      )}

      {view && (
        <div className="form-container">
          <h2>Expense Form</h2>
          <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">--Select option--</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div></div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <input
              type="file"
              name="imageFile"
              // value={formData.imageFile}
              onChange={(e) => {
                console.log(e.target.files);
                setFormData((pre) => ({
                  ...pre,
                  imageFile: e.target.files[0],
                }));
              }}
            />

            <button type="submit" className="btn primary">
              Submit
            </button>
          </form>
          <button className="btn danger close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      )}

      {expenses?.length > 0 && (
        <div className="table-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search by name or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="expense-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataToRender.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/image/${item.imageFile}`}
                      alt="Preview"
                      style={{ height: "50px", width: "50px" }}
                    />
                  </td>

                  <td>
                    <button
                      className="btn danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    {UserData?.ispremium &&( 
                    <button
                      className="btn danger"
                      onClick={() => {
                        setEditingId(item._id);
                        setFormData({
                          name: item.name,
                          description: item.description,
                          category: item.category,
                          date: item.date,
                        });
                        setView(true);
                      }}
                    >
                      Edit
                    </button> )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
{UserData?.ispremium &&(
          <CSVLink
            data={Exp}
            headers={headers}
            filename="expenses.csv"
            className="btn export-btn"
            onClick={Allexp}
          >
            Export Expenses CSV
          </CSVLink> )}

          <div className="pagination">
            <button
              onClick={handleleft}
              disabled={pageCount === 1}
              className="btn primary"
            >
              Back
            </button>
            <p>{pageCount}</p>
            <button
              onClick={handleright}
              disabled={pageCount === Math.ceil(maxCount / 5) || maxCount === 0}
              className="btn primary"
            >
              Next
            </button>
          </div>

          <button className="btn danger clear-btn" onClick={handleClear}>
            Clear All
          </button>
        </div>
      )}
      {!UserData?.ispremium && (
        <p style={{ color: "red", fontSize: "15px" }}>
          🔒 Upgrade to Premium to edit or export!
        </p>
      )}
    </div>
  );
};

export default Home;
