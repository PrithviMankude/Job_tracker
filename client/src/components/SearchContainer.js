import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search jobs</h4>
        <div className='form-centre'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            labelText='Status'
            list={[...statusOptions, 'all']}
          />
          <FormRowSelect
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            labelText='Job Type'
            list={[...jobTypeOptions, 'all']}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
