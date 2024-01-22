import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ... (your imports)

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await getearchData();
      console.log("data is", data);
      setSearchResults(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getearchData = async () => {
    const res = await fetch(`http://localhost:8003/search/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  };

  console.log("result", searchResults);

  useEffect(() => {
    getearchData().then((data) => setSearchResults(data));
  }, [searchTerm]);

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResults.length > 0 && (
              <table className="table mt-4">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{result.name}</td>
                      <td>{result.email}</td>
                      <td>{result.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
