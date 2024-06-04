const { Pool } = require('pg');

/*const pool = new Pool({
    connectionString: process.env.DATABASE_URL|| 'postgres://postgres:admin@localhost:5432/firstapi',
    ssl: process.env.DATABASE_URL ? true : false
})*/

const pool = new Pool({
    user: 'postgres',
    host: '148.113.173.103',
    database: 'location_test',
    password: 'pvta2000',
    port: 41447,
})

const getLocations = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM location');
        const responseData = {
            success: true,
            data: response.rows,
            message: "successfull"
        }
        console.log("OK ALL ");
        res.status(200).json(responseData);
    }
    catch(error){
        console.log("error ALL " + error);
        const responseData = {
            success: false,
            data: null,
            message: err.message
        }
        res.send(responseData);
    }
};

const getLocationByNumPhone = async(req,res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM location WHERE numPhone = $1',[id]);
    res.json(response.rows);
};

const saveLocation = async (req,res)=>{
    const phoneNum = req.body.phoneNum;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const query = "INSERT INTO location (phoneNum,name,lastName,lat,lng,lastDate) VALUES ($1,'','',$2,$3,to_char(NOW() - interval '5 hour', 'YYYY-MM-DD HH24:MI:SS')) ON CONFLICT (phoneNum) DO UPDATE SET lat = $2, lng = $3, lastDate = to_char(NOW() - interval '5 hour', 'YYYY-MM-DD HH24:MI:SS')"
    const response = await pool.query(query,[phoneNum, lat,lng]);
    let now = new Date();
    console.log(phoneNum + " OK " + now) 
    const responseData = {
        success: true,
        data: [],
        message: "successfull"
    }
    res.json(responseData);
};
/*
const deleteUser = async(req,res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);
};

const updateUser = async(req,res) => {
    const id = req.params.id;
    const {name, email} = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id = $3',[name, email,id]);
    console.log(response);
    res.json('User updated successfully');
};
*/
module.exports = {
    getLocations,
    getLocationByNumPhone,
    saveLocation,
  /*  deleteUser,
    updateUser*/
}