
import PropTypes from "prop-types"
import { useState } from 'react'

const data = [
    {
        id: 1,
        name: 'Jhon',
        description: 'This is the description for my first task.',
        isstatus: false,
    },
    {
        id: 2,
        name: 'Firnaz',
        description: 'This is the description for my second task.',
        isstatus: false,
    },
];


const Display = (props) => {

    const handleSelectChange = (e) => {
        const id = props.id;
        const newStatus = e.target.value;
        props.editForm(id, newStatus);
    }
    const handleedit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="discon">
            <h2>{'Id : ' + props.id}</h2>
            <h2>{'Name : ' + props.name}</h2>
            <h4>{'Description : ' + props.description}</h4>
            <h2>
                <label htmlFor="isstatus">Status : </label>
                <select style={{
                    backgroundColor: (props.isstatus ? 'green' : 'red'),
                    padding: '5px'
                }} name='isstatus' onChange={handleSelectChange}
                    value={props.isstatus ? 'true' : 'false'} >
                    <option style={{ backgroundColor: 'red' }} value='false'>Not Completed</option>
                    <option style={{ backgroundColor: 'green' }} value='true'>Completed</option>
                </select></h2>
            <br></br>
            <button onClick={() => props.deleteData(props.id)} className="btn-de">{'Delete'}</button>
            <button onClick={() => handleedit()} className="btn-ed">{'Edit'}</button>
        </div>
    )
};

Display.PropTypes =
{
    index: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    isstatus: PropTypes.bool,
    deleteData: PropTypes.func,
    editForm: PropTypes.func,
};


const ShowDetail = () => {

    const [students, setStudents] = useState(data);
    const [Displaydetails, setDisplayDetails] = useState(data);

    const [formData, setformData] = useState(
        {
            name: "",
            description: "",
        }
    );

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const deleteData = (index) => {
        const fildata = Displaydetails.filter((item) => item.id !== index)
        setStudents(fildata);
        setDisplayDetails(fildata);
    }

    const changeFilter = (e) => {
        console.log(e.target.value);
        if (e.target.value === "true") {
            setDisplayDetails(students.filter((stu) => stu.isstatus));
        } else if (e.target.value === "false") {
            setDisplayDetails(students.filter((stu) => !stu.isstatus));
        } else {
            setDisplayDetails(students);
        }
    };

    const editForm = (id, newStatus) => {
        const updatedData = Displaydetails.map(item => {
            if (item.id === id) {
                return { ...item, isstatus: newStatus };
            }
            return item;
        });
        setDisplayDetails(updatedData);
    }

    const createForm = (value) => {
        const temp = { ...value }
        const id = Displaydetails.length + 1;
        temp.isstatus = false;
        temp.id = id;
        setDisplayDetails([...Displaydetails, temp])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createForm(formData);
    }
    return (
        <div className="contain">
            <div style={{ padding: '60px', textAlign: 'center', }}>
                <h1>{'Task Status'}</h1>
                <form onSubmit={handleSubmit}>
                    <input style={{ width: '20%' }} type={"text"} placeholder="Name" onChange={handleChange} name="name" value={formData.name} required />
                    <input style={{ width: '30%' }} type={"text"} placeholder="Description" onChange={handleChange} name="description" value={formData.description} required />
                    <button className='btn' type="submit">{'Add to Data'}</button>
                </form>
                <select style={{ float: 'right', marginTop: '100px' }} onChange={changeFilter}>
                    <option value="all">All</option>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px' }}>
                {
                    Displaydetails.map((val) => (
                        <Display key={val.id}{...val} deleteData={deleteData} editForm={editForm} />
                    ))};
            </div>
        </div>
    );
};





export default ShowDetail