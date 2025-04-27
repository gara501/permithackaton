export async function assignRole(req, res) {
  const { userId, role, tenant="default" } = req.body;  // this is comming from frontend

  try {
    await req.permit.api.assignRole({
      user: userId,      // Clerk user ID
      role: role,        // role name
      tenant: tenant, // tenant if we are managing multiple companies
    });

    res.status(200).json({ message: `Role ${role} assigned to the user ${userId}` });
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).json({ message: "Error assigning role" });
  }
}