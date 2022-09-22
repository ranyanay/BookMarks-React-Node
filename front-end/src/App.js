import react, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  //general
  const [allBookmarks, setAllBookmarks] = useState([{}]);
  const [showAllBookmarks, setShowAllBookmarks] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showfilteredData, setShowfilteredData] = useState(false);
  //search-Form
  const [filteredBookmarks, setfilteredBookmarks] = useState([{}]);
  const [searchText, setSearchText] = useState("");
  //delete-Form
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  //edit-Form
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedBookmarkNameText, setEditedBookmarkNameText] = useState("");
  const [addressEditText, setAddressEditText] = useState("");
  const [nameEditText, setNameEditText] = useState("");
  const [descriptionEditText, setDescriptionEditText] = useState("");
  const [taskEditText, setTaskEditText] = useState("");
  //add Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressText, setAddressText] = useState("");
  const [nameText, setNameText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [taskText, setTaskText] = useState("");

  //loading all data to be ready on start.
  useEffect(() => {
    fetchAllBookmarksFunc();
  }, []);

  const handleEdit = async () => {
    if (
      (addressEditText === "" &&
        nameEditText === "" &&
        descriptionEditText === "" &&
        taskEditText === "") ||
      editedBookmarkNameText === ""
    ) {
      return window.alert("You must enter something to change");
    }

    const bodyJson = JSON.stringify({
      Address: addressEditText ? addressEditText : "",
      Name: nameEditText ? nameEditText : "",
      Description: descriptionEditText ? descriptionEditText : "",
      Task: taskEditText ? taskEditText : "",
    });

    try {
      const result = await fetch(`/update/${editedBookmarkNameText}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: bodyJson,
      });

      if (!result.ok) {
        window.alert("Something went wrong, check your inputs");
      } else {
        window.alert("You have edited " + editedBookmarkNameText + " bookmark");
        setEditedBookmarkNameText("");
        setAddressEditText("");
        setNameEditText("");
        setDescriptionEditText("");
        setTaskEditText("");
        fetchAllBookmarksFunc();
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleDelete = () => {
    if (deleteText === "") {
      return window.alert("You must enter bookmark's name");
    }

    const bodyJson = JSON.stringify({
      Name: deleteText,
    });

    fetch("/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: bodyJson,
    })
      .then((data) => {
        if (!data.ok) {
          return window.alert(
            "Something went wrong, check the name your have entered"
          );
        }

        window.alert("You have deleted " + deleteText + " bookmark");
        setDeleteText("");
        fetchAllBookmarksFunc();
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const handleAdd = () => {
    if (addressText === "" || nameText === "") {
      return window.alert("You must enter address and name fields");
    }
    const bodyJson = JSON.stringify({
      Address: addressText,
      Name: nameText,
      Description: descriptionText,
      Task: taskText,
    });

    fetch("/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: bodyJson,
    })
      .then((data) => {
        if (!data.ok){
          return window.alert("Something went wrong, check you inputs.");
        }
        window.alert("You have added a new bookmark");
        setAddressText("");
        setNameText("");
        setDescriptionText("");
        setTaskText("");
        fetchAllBookmarksFunc();
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const fetchAllBookmarksFunc = async () => {
    fetch("/getAll")
      .then(async (data) => {
        let result = await data.json();

        setAllBookmarks(result.data);
      })
      .catch((e) => {
        window.alert("There was some problem 1", e.message);
      });
  };

  const handleSearch = async () => {
    if (searchText === "") {
      return window.alert("You must enter some text to search");
    }

    fetch(`/find/${searchText}`)
      .then(async (data) => {
        let result = await data.json();

        setfilteredBookmarks(result.data);
        setShowAllBookmarks(false);
        setShowfilteredData(true);
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };

  return (
    <>
      <section>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setShowAllBookmarks(false);
            setShowSearchBar(false);
            setShowAddForm(false);
            setShowDeleteForm(false);
            setShowEditForm(false);
            setShowfilteredData(false);
          }}
        >
          Home
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowAllBookmarks(true);
            setShowSearchBar(false);
            setShowAddForm(false);
            setShowDeleteForm(false);
            setShowEditForm(false);
            setShowfilteredData(false);
          }}
        >
          Show All Bookmarks
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowSearchBar(!showSearchBar);
            setShowAllBookmarks(false);
            setShowAddForm(false);
            setShowDeleteForm(false);
            setShowEditForm(false);
            setShowfilteredData(false);
          }}
        >
          Search Bookmarks
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowAllBookmarks(false);
            setShowDeleteForm(false);
            setShowEditForm(false);
            setShowfilteredData(false);
            setShowSearchBar(false);
          }}
        >
          Add bookmark
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowDeleteForm(!showDeleteForm);
            setShowAllBookmarks(false);
            setShowAddForm(false);
            setShowEditForm(false);
            setShowfilteredData(false);
            setShowSearchBar(false);
          }}
        >
          Remove bookmark
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowEditForm(!showEditForm);
            setShowAllBookmarks(false);
            setShowAddForm(false);
            setShowDeleteForm(false);
            setShowfilteredData(false);
            setShowSearchBar(false);
          }}
        >
          Edit bookmark
        </button>

        {showSearchBar && (
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSearch}
            >
              Search
            </button>
          
            <input
              className="align-self-center align-text-top"
              type="search"
              onChange={(text) => setSearchText(text.target.value)}
              placeholder="Name"
            ></input>
          </div>
        )}

        {showEditForm && (
          <div >
            <div>
              <input
                className="form-control btn btn-outline-info"
                type="text"
                onChange={(text) =>
                  setEditedBookmarkNameText(text.target.value)
                }
                placeholder="ENTER the name of the bookmark you would like to edit.                                 EXAMPLE: 'Youtube'"
              ></input>
            </div>
            <div className="row">
              <label>Address</label>
              <input
                className="form-control"
                type="text"
                onChange={(text) => setAddressEditText(text.target.value)}
              ></input>
            </div>
            <div>
              <label className="form-group" htmlFor="say">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(text) => setNameEditText(text.target.value)}
              />
            </div>
            <div>
              <label className="form-group" htmlFor="say">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(text) => setDescriptionEditText(text.target.value)}
              />
            </div>
            <div>
              <label className="form-group" htmlFor="say">
                Task
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(text) => setTaskEditText(text.target.value)}
              />
            </div>
            <div>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleEdit}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {showDeleteForm && (
          <div className="search-container">
            <button
              type="button"
              className="btn btn btn-secondary"
              onClick={handleDelete}
            >
              Delete
            </button>
            <input
              placeholder="Enter bookmark NAME"
              type="text"
              onChange={(text) => setDeleteText(text.target.value)}
            ></input>
          </div>
        )}
      </section>

      {showAddForm && (
        <div>
          <div>
            <label>Address</label>
            <input
              className="form-control"
              type="text"
              onChange={(text) => setAddressText(text.target.value)}
              value={addressText}
              placeholder = "EXAMPLE: http://wwww.domain.com"
            ></input>
          </div>
          <div>
            <label className="form-group" htmlFor="say">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(text) => setNameText(text.target.value)}
              value={nameText}
            />
          </div>
          <div>
            <label className="form-group" htmlFor="say">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(text) => setDescriptionText(text.target.value)}
              value={descriptionText}
            />
          </div>
          <div>
            <label className="form-group" htmlFor="say">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(text) => setTaskText(text.target.value)}
              value={taskText}
            />
          </div>
          <div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {(showAllBookmarks || showfilteredData) && (
        <div>
          {showAllBookmarks
            ? allBookmarks.bookmarks.map((book) => (
                <div className="d-inline-flex p-2 bd-highlight" key={book._id}>
                  <div className="card">
                    <div className="card-body ">
                      <h5 className="card-title">Name: {book.Name}</h5>
                      <h6 className="card-subtitle mb-1 text-muted">
                        ID: {book._id}
                      </h6>
                      <p className="card-text mb-1">
                        Description: {book.Description}
                      </p>
                      <p className="card-text">Task: {book.Task}</p>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={"//" + book.Address}
                        className="card-link"
                      >
                        {book.Address}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            : filteredBookmarks?.bookmarks.map((book) => (
                <div className="d-inline-flex p-2 bd-highlight" key={book._id}> 
                  <div className="card" >
                    <div className="card-body ">
                      <h5 className="card-title">Name: {book.Name}</h5>
                      <h6 className="card-subtitle mb-1 text-muted">
                        ID: {book._id}
                      </h6>
                      <p className="card-text mb-1">
                        Description: {book.Description}
                      </p>
                      <p className="card-text">Task: {book.Task}</p>
                      <a
                       target="_blank"
                       rel="noreferrer"
                       href={"//" + book.Address}
                       className="card-link"
                     >
                        {book.Address}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}
    </>
  );
}

export default App;
