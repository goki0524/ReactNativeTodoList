package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Model >>>>>>>>>>>

// Todo Model
type Todo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	User  *User  `json:"user"`
}

// User Model
type User struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

// Model <<<<<<<<<<

// Init totos var as a slice Todo struct
var todos []Todo

// Get all todos
func getTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}

// Get single todo
func getTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Get params
	// Loop through todos and find one with the id from the params
	for _, item := range todos {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Todo{})
}

// Add new todo
func createTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var todo Todo
	_ = json.NewDecoder(r.Body).Decode(&todo)
	todo.ID = strconv.Itoa(rand.Intn(100000000))
	todos = append(todos, todo)
	json.NewEncoder(w).Encode(todo)
}

// Update todo
func updateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range todos {
		if item.ID == params["id"] {
			todos = append(todos[:index], todos[index+1:]...)
			var todo Todo
			_ = json.NewDecoder(r.Body).Decode(&todo)
			todo.ID = params["id"]
			todos = append(todos, todo)
			json.NewEncoder(w).Encode(todo)
			return
		}
	}

}

// Delete todo
func deleteTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range todos {
		if item.ID == params["id"] {
			todos = append(todos[:index], todos[index+1:]...)
			break
		}
		json.NewEncoder(w).Encode(todos)
	}
}

// Main function
func main() {
	// Init router
	r := mux.NewRouter()

	// TODO: ADD DATABASE
	// Hardcoded data
	todos = append(todos, Todo{ID: "1", Title: "Complete the TODO app", Done: false, User: &User{Firstname: "Goki", Lastname: "Sakaguchi"}})
	todos = append(todos, Todo{ID: "2", Title: "Build an NR development environment", Done: true, User: &User{Firstname: "Goki", Lastname: "Sakaguchi"}})

	// Route handles & endpoints
	r.HandleFunc("/todos", getTodos).Methods("GET")
	r.HandleFunc("/todos/{id}", getTodo).Methods("GET")
	r.HandleFunc("/todos", createTodo).Methods("POST")
	r.HandleFunc("/todos/{id}", updateTodo).Methods("PUT")
	r.HandleFunc("/todos/{id}", deleteTodo).Methods("DELETE")

	// Start server
	log.Fatal(http.ListenAndServe(":8008", r))

}
