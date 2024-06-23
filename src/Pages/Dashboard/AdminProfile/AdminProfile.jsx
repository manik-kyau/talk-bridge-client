import { useEffect, useState } from 'react';
import Banner from '../../../assets/images/admin.jpg';
import { MdModeComment, MdPostAdd } from 'react-icons/md';
// import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUsers } from 'react-icons/fa6';
// import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#FFBB28', '#0088FE', '#FF8042'];


const AdminProfile = () => {

    const [admin, setAdmin] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const axiosSecure = useAxiosSecure();
    // console.log(admin);


    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                const Admin = data.find(dta => dta.role === 'admin')
                setAdmin(Admin);
            })
    }, [])

    
    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => {
                setTotalCount(res.data)
                // console.log(res.data.posts);
            })
    }, [])

    // custom shape for the pie chart
    const data = [
        { name: 'Posts', value: totalCount.posts },
        { name: 'Users', value: totalCount.users },
        { name: 'Comments', value: totalCount.comments },
        // { name: 'Group D', value: 200 },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className=''>
            <div className=''>
                <div className='w-[650px] shadow-xl rounded-2xl mx-auto'>
                    <div className='relative'>
                        <img className='h-[150px] w-full  rounded-t-2xl' src={Banner} alt="" />
                        <img className='h-[120px] w-[120px] absolute left-[40%] top-[58%] rounded-full border-4 border-white' src={admin.image} alt="" />
                    </div>

                    <div className='mt-16 space-y-6'>
                        <div className='space-y-3'>
                            <h2 className="bg-orange-400 text-white w-24 mx-auto text-center py-1 text-lg font-bold rounded-2xl">{admin.role}</h2>
                        </div>

                        <div className='flex justify-between px-5 pb-10'>
                            <div>
                                <h2 className='text-base font-semibold'>Name:</h2>
                                <h2 className='text-lg font-semibold'>{admin.name}</h2>
                            </div>
                            <div className=''>
                                <h2 className='text-base font-semibold'>Email:</h2>
                                <h2 className='text-lg font-semibold'>{admin.email}</h2>
                            </div>
                            <div className='flex items-center'>
                                <button className='btn bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-base font-semibold'>Update Profile</button>
                            </div>
                        </div>
                    </div>

                </div>
                {/*  */}
                <div>
                    {/* <h2 className='text-2xl font-bold text-center pb-3'>Total Activities</h2> */}
                    <div className='flex gap-6 mt-14'>

                        {/* posts */}
                        <div className="w-full flex items-center gap-4 bg-gradient-to-r from-[#3d89e6] to-[#a0e8f1] px-5 py-3 rounded-lg" >
                            <MdPostAdd className="text-5xl text-white"></MdPostAdd>
                            <div>
                                <h2 className="text-4xl font bold text-white">{totalCount.posts}</h2>
                                <p className="text-2xl font-normal text-white">Total Posts</p>
                            </div>
                        </div>

                        {/*  */}
                        <div className="w-full flex items-center gap-4 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] px-5 py-3 rounded-lg">
                            <MdModeComment className="text-5xl text-white"></MdModeComment>
                            <div>
                                <h2 className="text-4xl font bold text-white">{totalCount.users}</h2>
                                <p className="text-2xl font-normal text-white">Total Users</p>
                            </div>
                        </div>

                        {/*  */}
                        <div className="w-full flex items-center gap-4 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] px-5 py-3 rounded-lg">
                            <FaUsers className="text-5xl text-white"></FaUsers>
                            <div>
                                <h2 className="text-4xl font bold text-white">{totalCount.comments}</h2>
                                <p className="text-2xl font-normal text-white">Total Comments</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Pie chart */}
            <div>
                {/* <h2 className='text-4xl font-bold mt-14'>Pie chart for total Users,Posts, and Comments</h2> */}
                <div className='flex justify-center items-center mt-14 mb-8 h-[450px]' >
                    {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <PieChart width={500} height={500}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={200}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>

                    {/* </ResponsiveContainer> */}
                </div>
            </div>

        </div>
    );
};

export default AdminProfile;