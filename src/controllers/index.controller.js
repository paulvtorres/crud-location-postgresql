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
    const levelBattery = req.body.levelBattery;
    const gps = req.body.gps;
    const query = "INSERT INTO location (phoneNum,name,lastName,lat,lng,lastDate) VALUES ($1,'','',$2,$3,to_char(NOW() - interval '5 hour', 'YYYY-MM-DD HH24:MI:SS')) ON CONFLICT (phoneNum) DO UPDATE SET lat = $2, lng = $3, levelBattery = $4, gps = $5, lastDate = to_char(NOW() - interval '5 hour', 'YYYY-MM-DD HH24:MI:SS')"
    const response = await pool.query(query,[phoneNum, lat,lng,levelBattery,gps]);
    let now = new Date();
    console.log(phoneNum + " OK " + now) 
    const responseData = {
        success: true,
        data: [],
        message: "successfull"
    }
    res.json(responseData);
};

const saveName = async (req, res) => {
    const phoneNum = req.body.phoneNum;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const query = "INSERT INTO location (phoneNum,name,lastName) VALUES ($1,$2,$3) ON CONFLICT (phoneNum) DO UPDATE SET name = $2, lastName = $3"
    const response = await pool.query(query, [phoneNum, name,lastName]);
    let now = new Date();
    console.log(phoneNum + " Name OK " + now)
    const data = { name : name, lastName : lastName}
    const responseData = {
        success: true,
        data: data,
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
    saveName,
  /*  deleteUser,
    updateUser*/
}