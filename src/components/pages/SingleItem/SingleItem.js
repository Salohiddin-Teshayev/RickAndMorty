import { useEffect, useState} from 'react';
import './single-item.css';
import { useParams } from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import ReactLoading from 'react-loading';
export function SingleItem() {
    const navigate = useNavigate();
    const params = useParams();   
    const [data, setData] = useState({});
    const api = `https://rickandmortyapi.com/api/character/${params?.id}`;
    useEffect(() => {
        (async () => {
            try {
               const res = await fetch(api);
               const data = await res.json();
               setData(data);
            }catch(e) {
                console.dir(e);
            }
        })();
    }, [api]);

    return (
       JSON.stringify(data) !== '{}'
       ? <div className='container w-8/12 flex flex-col items-center mx-auto p-6'>
       <ul className='list-unstyled w-full flex flex-wrap gap-y-4 items-center justify-center mt-10 mb-5'>
           
           <li key={data?.id} className='flex w-full border-2 bg-gray-600 rounded-md shadow-sm backdrop-blur-md transition'>
               <img className='w-4/12 h-full object-cover rounded-sm' src={data?.image} alt={data?.name} />
               <div className='flex flex-col w-8/12 p-2 pl-3'>
                   <h3 className='lg:text-[38px] sm:text-[22px] text-white font-bold font-mono'>{data?.name}</h3>
                   <p className={`mt-0 mb-4 lg:text-[22px] sm:text-[18px] text-white font-semibold species ${data?.status === 'Alive' ? 'before:bg-green-600' : data?.status === 'Dead' ? 'before:bg-red-500' : 'before:bg-slate-400'}`}>{data?.status?.[0].toUpperCase() + data?.status?.slice(1)} - {data?.species}</p>
                   <div className='flex flex-col lg:gap-4 sm:gap-2'>
                       <p className='lg:text-[22px] sm:text-[18px] text-slate-400'>Last known location: </p>
                       <p className='lg:text-[22px] sm:text-[18px] text-slate-50'>{data?.location?.name}</p>
                   </div>
               </div>
           </li>           
    </ul>
    <button onClick={() => navigate(-1)} className='ml-auto px-10 py-3 bg-red-500 hover:opacity-80 text-white rounded-md' to='/'>
       Back
    </button>
   
   
   </div> 
   
    :  <ReactLoading className='mx-auto mt-10' type='balls' color='#32cd32' height={'5%'} width={'8%'} />
     
    );

    
}