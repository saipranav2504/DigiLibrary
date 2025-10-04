import { DataTypes } from "sequelize";
import sequelize from "../database/db.js"; 

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // unique id
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      defaultValue: "User",
    },
    accountVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avatar_public_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verificationCodeExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

User.prototype.generateVerificationCode = async function () {
    function generateRandomCode() {
        const firstDigit = Math.floor(1 + Math.random() * 9); 
        const otherDigits = Math.floor(Math.random() * 1000).toString().padStart(4, 0);

        return parseInt(firstDigit + otherDigits); // 5 digit no.
    }

    const code = generateRandomCode();
    this.verificationCode = code;
    this.verificationCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now
    return code;
}

export default User;
