const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",

    // Get All Employees Query
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees.map(employee => ({
          id: employee._id.toString(),  // Map _id to id
          ...employee._doc,
          date_of_joining: new Date(employee.date_of_joining).toISOString().split('T')[0], 
        }));
      } catch (error) {
        throw new Error("Error fetching employees: " + error.message);
      }
    },

    // Get Employee by ID Query
    getEmployeeById: async (_, { eid }) => {
      try {
        const employee = await Employee.findById(eid);
        if (!employee) throw new Error("Employee not found.");
        return {
          id: employee._id.toString(),
          ...employee._doc,
          date_of_joining: new Date(employee.date_of_joining).toISOString().split('T')[0], 
        };
      } catch (error) {
        throw new Error("Error fetching employee: " + error.message);
      }
    },

    // Search Employees by Designation or Department Query
    searchEmployees: async (_, { designation, department }) => {
      try {
        const employees = await Employee.find({
          $or: [{ designation }, { department }],
        });
        return employees.map(employee => ({
          id: employee._id.toString(),
          ...employee._doc,
          date_of_joining: new Date(employee.date_of_joining).toISOString().split('T')[0],
        }));
      } catch (error) {
        throw new Error("Error searching employees: " + error.message);
      }
    },
  },

  Mutation: {
    // Signup Mutation
    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email already in use. Please login or use another email.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        return {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          message: "Signup successful! Please login.",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Login Mutation
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found! Please sign up.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials! Please try again.");
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, username: user.username },
          "mySuperSecretKey",
          { expiresIn: "1h" }
        );

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Create Employee Mutation
    addEmployee: async (_, { input }) => {
      try {
        const newEmployee = new Employee(input);
        await newEmployee.save();
        return {
          id: newEmployee._id.toString(),
          ...newEmployee._doc,
          date_of_joining: new Date(newEmployee.date_of_joining).toISOString().split('T')[0], 
        };
      } catch (error) {
        throw new Error("Error adding employee: " + error.message);
      }
    },

    // Update Employee Mutation
    updateEmployee: async (_, { eid, input }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { $set: input }, { new: true });
        if (updatedEmployee) {
          return {
            id: updatedEmployee._id.toString(),
            ...updatedEmployee._doc,
            date_of_joining: new Date(updatedEmployee.date_of_joining).toISOString().split('T')[0], 
          };
        }
        return null;
      } catch (error) {
        throw new Error("Error updating employee: " + error.message);
      }
    },

    // Delete Employee Mutation
    deleteEmployee: async (_, { eid }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (deletedEmployee) {
          return {
            id: deletedEmployee._id.toString(),
            ...deletedEmployee._doc,
            date_of_joining: new Date(deletedEmployee.date_of_joining).toISOString().split('T')[0], 
          };
        }
        return null;
      } catch (error) {
        throw new Error("Error deleting employee: " + error.message);
      }
    },
  },
};

module.exports = resolvers;
