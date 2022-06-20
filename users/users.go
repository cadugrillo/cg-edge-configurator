package users

import (
	"encoding/json"
	"os"

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

func GetUsers() Users {
	f, err := os.Open("./users/users.json")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	var usr Users
	decoder := json.NewDecoder(f)
	err = decoder.Decode(&usr)
	if err != nil {
		panic(err)
	}

	return usr
}

func UpdateUsers(Users Users) string {
	f, err := os.Create("./users/users.json")
	if err != nil {
		return err.Error()
	}
	defer f.Close()

	for i := 1; i < len(Users.Users); i++ {
		Users.Users[i].ID = xid.New().String()
	}

	encoder := json.NewEncoder(f)
	err = encoder.Encode(&Users)
	if err != nil {
		return err.Error()
	}
	return "Users updated successfully!"
}

func AddUser() string {
	Users := GetUsers()
	newUser := []User{{Username: xid.New().String()}}
	Users.Users = append(Users.Users, newUser...)
	UpdateUsers(Users)
	return "New user added"
}

func DeleteUser(Id string) string {
	if Id == "master" {
		return "master user can't be deleted"
	}
	Users := GetUsers()
	for i, t := range Users.Users {
		if t.ID == Id {
			Users.Users = append(Users.Users[:i], Users.Users[i+1:]...)
			UpdateUsers(Users)
			return "User deleted successfully"
		}
	}

	return "Could not find user based on current ID"
}
