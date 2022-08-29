import React, { useContext, Fragment, useEffect } from "react";
import ProductContext from "../contexts/Product";

export default function SearchForm(props) {
  const { setSearchResult } = props;
  const { context, products, setOneProduct, types, countries, packaging, searchFields, setSearchFields, getProducts } = useContext(ProductContext);

  useEffect(() => {
    context.getSearchFields();
  }, []);

  const updateSearchFields = (evt) => {
    setSearchFields({
      ...searchFields,
      [evt.target.name]: evt.target.value,
    });
  };
  const onSearchClick = (e) => {
    //context.getProducts()
    e.preventDefault();
    setSearchResult(searchFields);
  };
  const onSearchReset = async () => {
    setSearchFields({});
  };

  return (
    <Fragment>
      <div className="accordion mt-4 mb-4" id="accordion">
        <div className="accordion-item mx-4 shadow-lg">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <span>
                <i className="bi bi-search"></i> Search Filter
              </span>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingSearch" data-bs-parent="#accordionSearch">
            <div className="accordion-body">
              {products.length !== 0 ? (
                <p className="alert alert-dark">{products.length} result(s) found.</p>
              ) : (
                <p className="alert alert-danger">No results found.</p>
              )}
              <form className="row">
                <div className="col-12 col-lg-12">
                  <div className="mt-3">
                    <label className="text-muted">Name</label>
                    <input
                      id="name"
                      name="name"
                      className="form-control"
                      type="text"
                      onChange={updateSearchFields}
                      value={(searchFields && searchFields.name) || ""}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-muted">Min Shelf Life</label>
                    <input
                      id="minShelfLife"
                      name="min_shelf_life"
                      className="form-control mb-2"
                      type="text"
                      onChange={updateSearchFields}
                      value={(searchFields && searchFields.min_shelf_life) || ""}
                      placeholder="100"
                    />
                  </div>

                  <div className="mt-3">
                    <label className="text-muted">Max Shelf Life</label>
                    <input
                      id="maxShelfLife"
                      name="max_shelf_life"
                      className="form-control mb-2"
                      type="text"
                      onChange={updateSearchFields}
                      value={(searchFields && searchFields.max_shelf_life) || ""}
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="mt-3">
                    <label>Type</label>
                    <select
                      className="form-select mb-2"
                      id="type"
                      onChange={updateSearchFields}
                      value={(searchFields && searchFields.type_id) || ""}
                      name="type_id"
                    >
                      <option value="">---Select One---</option>
                      {types.map((t, i) => (
                        <option key={`type_${i}`} value={t[0]}>
                          {t[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" mt-3">
                    <label>Countries</label>
                    <select
                      className="form-select mb-2"
                      id="country"
                      onChange={updateSearchFields}
                      value={(searchFields && searchFields.country_id) || ""}
                      name="country_id"
                    >
                      <option value="">---Select One---</option>
                      {countries.map((c, i) => (
                        <option key={`country_${i}`} value={c[0]}>
                          {c[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3">
                    <label>Packaging</label>
                    <select
                      className="form-select mb-2"
                      id="packaging"
                      onChange={updateSearchFields}
                      value={(searchFields && searchFields.packaging_id) || ""}
                      name="packaging_id"
                    >
                      <option value="">---Select One---</option>
                      {packaging.map((p, i) => (
                        <option key={`package_${i}`} value={p[0]}>
                          {p[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="custom-btn-group mt-3 d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark btn-outline-light me-2" onClick={onSearchClick}>
                    Search
                  </button>
                  <button
                    type="reset"
                    className="btn btn-light btn-outline-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      onSearchReset();
                    }}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
