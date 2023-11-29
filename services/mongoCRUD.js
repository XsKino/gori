import mongo from "@/lib/mongo";
import User from "@/models/user";

export async function createUser(name) {
  await mongo();
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = new User({ name });
  const savedUser = await newUser.save();
  return savedUser;
}

export async function getUsers() {
  await mongo();
  const users = await User.find();
  return users;
}

export async function deleteUser(id) {
  await mongo();
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function getUserById(id) {
  await mongo();
  const user = await User.findOne({ name: id });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function updateUserById(id, conversation) {
  await mongo();
  const user = await User.findOne({ name: id });

  if (!user) {
    throw new Error("User not found");
  }

  const existingConversation = user.conversaciones.find(
    (conv) => conv.id === conversation.id
  );

  if (existingConversation) {
    throw new Error("Conversation with the same id already exists");
  }

  await User.findOneAndUpdate(
    { name: id },
    { $push: { conversaciones: conversation } },
    {
      new: true,
    }
  );

  return { message: "Updated" };
}
