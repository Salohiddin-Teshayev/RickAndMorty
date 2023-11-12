import { useEffect, useState, useRef } from 'react';
import './characters.css';
import ReactPaginate from 'react-paginate';
// import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import searchNotFoundImage from '../../../assets/image/search-not-found.avif';
const Characters = () => {
    let timeout = '';
    const species = ['human', 'animal', 'alien', 'robot', 'humanoid', 'disease', 'cronenberg', 'unknown'];
    const [activePage, setActivePage] =  useState(localStorage.getItem('activePage') || 1);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [speciesState, setSpecies] = useState('');
    const [data, setData] = useState([]);
    const {info, results} = data;
    const statusForm = useRef();
    const speciesForm = useRef();
    const genderForm = useRef();
    const api = `https://rickandmortyapi.com/api/character/?page=${activePage}&name=${query}&gender=${gender}&status=${status}&species=${speciesState}`;
    useEffect(() => {
        (async () => {
            const data = await fetch(api).then(data => data.json());
            setData(data);
         })();
    }, [api]);

    function handleQuery(value) {
        if(timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            setQuery(value)
        }, 400);
    }

    function clearFilter() {
        setStatus('');
        setGender('');
        setSpecies('');
        statusForm.current.reset();
        statusForm.current.closest('details').removeAttribute('open');
        speciesForm.current.reset();
        speciesForm.current.closest('details').removeAttribute('open')
        genderForm.current.reset();
        genderForm.current.closest('details').removeAttribute('open');
    }

    return (
        <>
            <div className='container mx-auto px-6'>
                    <h1 className='my-6 mb-9 text-4xl text-center text-slate-600'>Characters</h1>
                    
                    <form onSubmit={(evt) => evt.preventDefault() } className='flex items-center justify-center w-6/12 mx-auto mb-14'>
                        <input onChange={evt => handleQuery(evt.target.value)} className='w-full p-2 border-2 border-slate-400 rounded-lg' type='search' name="query" placeholder='Search here...' />
                    </form>
                    <div className='flex gap-10'>
                        <div className='w-3/12 flex flex-col items-center'>
                            <h2 className='mb-4 text text-3xl text-slate-700 text-center'>Filters</h2>
                      <button className='min-w-[120px] w-5/12 mb-6 px-2 py-2 border-2 border-transparent rounded-lg bg-red-400 text-white hover:bg-red-500 transition' type='button' onClick={(evt) => clearFilter(evt)}>
                                Clear all
                            </button>
                            <div className='w-full flex flex-col gap-2'>
                                <details className='w-full border-1 border-transparent rounded-lg bg-slate-400 text-white cursor-pointer'>
                                    <summary className='flex justify-between items-center w-full p-3 border-1 border-transparent rounded-lg bg-slate-500'>
                                        Filter by Status 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </summary>
                                    <form ref={statusForm} className='flex flex-wrap items-center gap-y-6 gap-2 p-3'>
                                        <div>
                                             <input onChange={(evt) => setStatus(evt.target.value)} id='alive' value='alive' className='hidden' type='radio' name="status" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='alive'>
                                                Alive
                                             </label>
                                        </div>
                                        <div>
                                             <input onChange={(evt) => setStatus(evt.target.value)} id='dead' value='dead' className='hidden' type='radio' name="status" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='dead'>
                                                Dead
                                             </label>
                                        </div>
                                        <div>
                                             <input onChange={(evt) => setStatus(evt.target.value)} id='unknown' value='unknown' className='hidden' type='radio' name="status" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='unknown'>
                                                Unknown
                                             </label>
                                        </div>
                                    </form>
                                </details>
                                <details className='w-full border-1 border-transparent rounded-lg bg-slate-400 text-white cursor-pointer'>
                                    <summary className='flex justify-between items-center w-full p-3 border-1 border-transparent rounded-lg bg-slate-500'>
                                        Filter by Species 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </summary>
                                    <form ref={speciesForm} className='flex flex-wrap items-center gap-y-6 gap-2 p-3'>
                                        {
                                            species.map(item => {
                                                return (
                                                    <div key={item}>
                                                        <input onChange={(evt) => setSpecies(evt.target.value)} id={`species-${item}`} value={item} className='hidden' type='radio' name="species" />
                                                        <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor={`species-${item}`}>
                                                            {item[0].toUpperCase() + item.slice(1)}
                                                        </label>
                                                     </div>
                                                );
                                            })
                                        }
                                    </form>
                                </details>
                                <details className='w-full border-1 border-transparent rounded-lg bg-slate-400 text-white cursor-pointer'>
                                    <summary className='flex justify-between items-center w-full p-3 border-1 border-transparent rounded-lg bg-slate-500'>
                                        Filter by Gender 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </summary>
                                    <form ref={genderForm} className='flex flex-wrap items-center gap-y-6 gap-2 p-3'>
                                        <div>
                                             <input onChange={(evt) => setGender(evt.target.value)} id='male' value='male' className='hidden' type='radio' name="gender" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='male'>
                                                Male
                                             </label>
                                        </div>
                                        <div>
                                             <input onChange={(evt) => setGender(evt.target.value)} id='female' value='female' className='hidden' type='radio' name="gender" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='female'>
                                                Female
                                             </label>
                                        </div>
                                        <div>
                                             <input onChange={(evt) => setGender(evt.target.value)} id='gender-unknown' value='unknown' className='hidden' type='radio' name="gender" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='gender-unknown'>
                                                Unknown
                                             </label>
                                        </div>
                                        <div>
                                             <input onChange={(evt) => setGender(evt.target.value)} id='genderless' value='genderless' className='hidden' type='radio' name="gender" />
                                             <label className='px-3 py-2 bg-cyan-400 rounded-md cursor-pointer' htmlFor='genderless'>
                                                Genderless
                                             </label>
                                        </div>
                                    </form>
                                </details>
                            </div>
                        </div>
                        <div className='w-8/12 flex flex-col items-center'>
                            <ul className='list-unstyled w-full flex flex-wrap gap-y-4 justify-center mb-5'>
                               
                               {
                                  
                                
                                  results ? results?.map(item => {
                                        return (
                                            <Link key={item.id} className='w-1/2 flex' to={`/character/${item.id}`}>
                                                <li key={item?.id} className='flex w-full h-full border-2 bg-gray-600 rounded-md shadow-sm backdrop-blur-md cursor-pointer hover:opacity-90 transition'>
                                                    <img className='w-4/12 h-full object-cover rounded-sm' src={item?.image} alt={item?.name} />
                                                    <div className='flex flex-col w-8/12 p-2 pl-3'>
                                                        <h3 className='text-[22px] text-white font-bold font-mono'>{item?.name}</h3>
                                                        <p className={`mt-0 mb-4 text-[18px] text-white font-semibold species ${item?.status === 'Alive' ? 'before:bg-green-600' : item?.status === 'Dead' ? 'before:bg-red-500' : 'before:bg-slate-400'}`}>{item?.status?.[0].toUpperCase() + item?.status?.slice(1)} - {item?.species}</p>
                                                        <div className='flex flex-col gap-2'>
                                                            <p className='text-[18px] text-slate-400'>Last known location: </p>
                                                            <p className='text-[18px] text-slate-50'>{item?.location?.name}</p>
                                                        </div>
                                                    </div>
                                                </li>   
                                            </Link>
                                        );
                                    }) : <img src={searchNotFoundImage} className='object-contain bg-slate-300' alt='not found' />
                                }
                               
                               
                            </ul>
                             {  
                                info?.pages  > 1 ? <div className='w-full flex justify-center p-3 pb-6'>
                                <ReactPaginate 
                                        className='flex gap-4' 
                                        previousLabel = 'Prev'
                                        previousClassName='px-3 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-md cursor-pointer transition'
                                        nextLabel = 'Next'
                                        nextClassName='px-3 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-md cursor-pointer transition'
                                        pageCount={info?.pages}
                                        pageClassName='flex'
                                        pageLinkClassName='px-4 py-2 text-slate-400 bg-transparent border-2 border-slate-400 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white transition'
                                        activeLinkClassName='bg-lime-400 text-white border-none'
                                        onPageChange={({selected}) => {
                                            setActivePage(selected + 1);
                                            localStorage.setItem('activePage', selected + 1);
                                        }}

                                />
                                </div> : ''
                             }
                        </div>
                    </div>
            </div>
        </>
    );
}

export default Characters;