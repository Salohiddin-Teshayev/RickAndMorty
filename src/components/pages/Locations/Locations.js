import './locations.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import empty from '../../../assets/image/empty.png';
const Locations = () => {
    const locations = [];
    const [data, setData] = useState(JSON.parse(localStorage.getItem('location') || '[]'));
    const [page, setPage] = useState(1);
    const [location, setLocation] = useState(1);
    const [locationData, setLocationData] = useState(JSON.parse(localStorage.getItem('locationData') || '[]'));
    let api = `https://rickandmortyapi.com/api/location?page=${page}`;
    
    useEffect(() => {
        fetch(api)
        .then(res => res.json())
        .then(value => {
            setData([...value.results]);
            for(let i = 2; i <= Number(value?.info?.pages); i++) {
                fetch(`https://rickandmortyapi.com/api/location?page=${i}`)
                .then(res => res.json())
                .then(value => {
                    setData((prev) => [...prev, ...value.results]);
                    localStorage.setItem('location', JSON.stringify(data));
                });
            }
        })
        .catch(e => console.dir(e));
    }, []);

    useEffect(() => {
        setLocationData([]);
        if(!data) {
            setData(JSON.parse(localStorage.getItem('location') || '[]'));
        }
        const locationCharacters = data.find(item => Number(item.id) === Number(location));
        locationCharacters?.residents?.forEach((link) => {
            fetch(link)
            .then(res => res.json())
            .then(data => setLocationData((prev) => [...prev, data]));
        });
        
        localStorage.setItem('locationData', JSON.stringify(locationData || '[]'));
  
       
    }, [location]);  
 
        
  
    return (
    <>
    
        <div className='container mx-auto px-6'>
                <h1 className='my-6 mb-9 text-4xl text-center text-slate-600'>Locations</h1>
                <strong className='block mb-5 font-mono font-semibold text-3xl text-center'>Location - {location}: <span className='text-lime-600'>{data[Number(location) - 1]?.name}</span></strong>
                <strong className='block mb-8 font-mono font-semibold text-2xl text-center'>Dimension : <span className='text-lime-500'>{data[Number(location) - 1]?.dimension}</span></strong>
                <div className='flex gap-10'>
                    <div className='w-3/12 flex flex-col items-center'>
                        <h2 className='mb-8 text text-3xl text-slate-700 text-center'>Choose location</h2>
                        <form onSubmit={(evt) => evt.preventDefault()} className='flex w-full'>
                            <select onChange={(e) => setLocation(e.target.value)} className='w-full p-3 border-2 border-slate-500 rounded-md text-slate-600 shadow-md text-lg' name='episode'>
                                {
                                    data.length ? data.map(item => <option key={item.id} value={item.id}>Location {item.id} - {item.name}</option>) : ''
                                }
                            </select>
                        </form>
                    </div>
                    <div className='w-8/12 flex flex-col items-center'>
                         <ul className='list-unstyled w-full flex flex-wrap gap-y-4 justify-center mb-5'>
                        {
                            
                            locationData.length ? locationData?.map((item,index) => {
                                return (
                                    <Link key={index} className='w-1/2 flex' to={`/character/${item.id}`}>
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
                            }) : <img src={empty} width={400} height={400} className='object-contain' alt='not found' />

                        }
                                 
                        </ul> 
                    </div>
                </div>
        </div>
    </>
    );
}

export default Locations;