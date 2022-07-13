package users

import (
	"database/sql"
	"log"
	"sync"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/xid"
)

type Users struct {
	Users []User `json:"Users"`
}

type User struct {
	ID          string     `json:"ID"`
	Username    string     `json:"Username"`
	Password    string     `json:"Password"`
	FullName    string     `json:"FullName"`
	Email       string     `json:"Email"`
	Telephone   string     `json:"Telephone"`
	Permissions Permission `json:"Permissions"`
}

type Permission struct {
	Dashboard      bool `json:"Dashboard"`
	Apps           bool `json:"Apps"`
	AppsRepository bool `json:"AppsRepository"`
	Users          bool `json:"Users"`
	Settings       bool `json:"Settings"`
	System         bool `json:"System"`
	Images         bool `json:"Images"`
	Placeholder1   bool `json:"Placeholder1"`
	Placeholder2   bool `json:"Placeholder2"`
	Placeholder3   bool `json:"Placeholder3"`
	Placeholder4   bool `json:"Placeholder4"`
}

var (
	once sync.Once
	db   *sql.DB
	err  error
)

func init() {
	time.Sleep(10 * time.Second)
	once.Do(initialiseDBconn)
}

func initialiseDBconn() {
	db, err = sql.Open("mysql", "root:cgEdgeRoot@tcp(mysql:3306)/cgEdge")
	//db, err = sql.Open("mysql", "root:cgEdgeRoot@tcp(localhost:3306)/cgEdge")
	if err != nil {
		log.Println("Opening:", err.Error())
		return
	}
	log.Println("SQL connection with cgEdge opened successfully")

	addTable, err := db.Prepare("CREATE TABLE IF NOT EXISTS cgUsers(ID varchar(255) primary key, Username varchar(255), Password varchar(255), FullName varchar(255), Email varchar(255), Telephone varchar(255), Dashboard boolean, Apps boolean, AppsRepository boolean, Users boolean, Settings boolean, `System` boolean, Images boolean)")
	if err != nil {
		log.Println("Preparing:", err.Error())
		return
	}
	_, err = addTable.Exec()
	if err != nil {
		log.Println("Executing:", err.Error())
		return
	}
	log.Println("Table cgUsers created successfully")

	var masterUser User
	masterUser.ID = "master"
	masterUser.Username = "master"
	masterUser.FullName = "master user account"
	masterUser.Password = "cgMaster@3306"
	masterUser.Permissions.Apps = true
	masterUser.Permissions.AppsRepository = true
	masterUser.Permissions.Dashboard = true
	masterUser.Permissions.Images = true
	masterUser.Permissions.Settings = true
	masterUser.Permissions.System = true
	masterUser.Permissions.Users = true

	r, err := db.Prepare("INSERT INTO cgUsers (ID, Username, Password, FullName, Email, Telephone, Dashboard, Apps, AppsRepository, Users, Settings, `System`, Images) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Username=?")
	if err != nil {
		log.Println(err.Error())
		return
	}
	_, err = r.Exec(masterUser.ID, masterUser.Username, masterUser.Password, masterUser.FullName, "", "", masterUser.Permissions.Dashboard, masterUser.Permissions.Apps, masterUser.Permissions.AppsRepository, masterUser.Permissions.Users, masterUser.Permissions.Settings, masterUser.Permissions.System, masterUser.Permissions.Images, masterUser.Username)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Println("Master user created!")

}

func GetUsers() Users {

	var users Users
	var user User
	var Password string

	rows, err := db.Query("SELECT * FROM cgUsers")
	if err != nil {
		log.Println(err.Error())
		return Users{}
	}
	defer rows.Close()

	for rows.Next() {
		rows.Scan(&user.ID, &user.Username, &Password, &user.FullName, &user.Email, &user.Telephone, &user.Permissions.Dashboard, &user.Permissions.Apps, &user.Permissions.AppsRepository, &user.Permissions.Users, &user.Permissions.Settings, &user.Permissions.System, &user.Permissions.Images)
		users.Users = append(users.Users, user)
	}

	return users
}

func AddUser() string {
	r, err := db.Prepare("INSERT INTO cgUsers (ID, Username, Password, FullName, Email, Telephone, Dashboard, Apps, AppsRepository, Users, Settings, `System`, Images) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		log.Println(err.Error())
		return err.Error()
	}
	_, err = r.Exec(xid.New().String(), xid.New().String(), "", "", "", "", true, false, false, false, false, false, false)
	if err != nil {
		log.Println(err.Error())
		return err.Error()
	}
	log.Println("New user successfully added")

	return "New user successfully added"
}

func UpdateUser(User User) string {

	if User.Password == "" {
		r, err := db.Prepare("UPDATE cgUsers SET Username=?, FullName=?, Email=?, Telephone=?, Dashboard=?, Apps=?, AppsRepository=?, Users=?, Settings=?, `System`=?, Images=? WHERE ID=?")
		if err != nil {
			log.Println(err.Error())
			return err.Error()
		}
		_, err = r.Exec(User.Username, User.FullName, User.Email, User.Telephone, true, User.Permissions.Apps, User.Permissions.AppsRepository, User.Permissions.Users, User.Permissions.Settings, User.Permissions.System, User.Permissions.Images, User.ID)
		if err != nil {
			log.Println(err.Error())
			return err.Error()
		}
		log.Println("User successfully updated")

		return "User successfully updated!"
	}

	r, err := db.Prepare("UPDATE cgUsers SET Username=?, Password=?, FullName=?, Email=?, Telephone=?, Dashboard=?, Apps=?, AppsRepository=?, Users=?, Settings=?, `System`=?, Images=? WHERE ID=?")
	if err != nil {
		log.Println(err.Error())
		return err.Error()
	}
	_, err = r.Exec(User.Username, User.Password, User.FullName, User.Email, User.Telephone, true, User.Permissions.Apps, User.Permissions.AppsRepository, User.Permissions.Users, User.Permissions.Settings, User.Permissions.System, User.Permissions.Images, User.ID)
	if err != nil {
		log.Println(err.Error())
		return err.Error()
	}
	log.Println("User successfully updated")

	return "User successfully updated!"
}

func DeleteUser(Id string) string {
	if Id == "master" {
		return "master user can't be deleted"
	}
	r, err := db.Prepare("DELETE FROM cgUsers WHERE ID=?")
	if err != nil {
		log.Println(err.Error())
		return err.Error()
	}
	_, err = r.Exec(Id)
	if err != nil {
		log.Println(err.Error())
		return err.Error()
	}
	log.Println("User successfully deleted")

	return "User successfully deleted"
}

func old_AddUser() string {
	Users := GetUsers()
	newUser := []User{{Username: xid.New().String()}}
	Users.Users = append(Users.Users, newUser...)
	//UpdateUsers(Users)
	return "New user added"
}

func Validate(User User) User {

	none := User
	none.Username = "invalid"

	Users := GetUsersValidation()
	for i := 0; i < len(Users.Users); i++ {
		if User.Username == Users.Users[i].Username {
			if User.Password == Users.Users[i].Password {
				Users.Users[i].Password = ""
				return Users.Users[i]
			}
		}
	}
	return none
}

func GetUsersValidation() Users {

	var users Users
	var user User

	rows, err := db.Query("SELECT * FROM cgUsers")
	if err != nil {
		log.Println(err.Error())
		return Users{}
	}
	defer rows.Close()

	for rows.Next() {
		rows.Scan(&user.ID, &user.Username, &user.Password, &user.FullName, &user.Email, &user.Telephone, &user.Permissions.Dashboard, &user.Permissions.Apps, &user.Permissions.AppsRepository, &user.Permissions.Users, &user.Permissions.Settings, &user.Permissions.System, &user.Permissions.Images)
		users.Users = append(users.Users, user)
	}

	return users
}
