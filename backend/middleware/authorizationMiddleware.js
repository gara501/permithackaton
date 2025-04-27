export async function isAdmin(req, res, next) {
  try {
    const userId = req.auth.userId; // El ID del usuario autenticado que viene de Clerk

    // Verificar con Permit.io si el usuario tiene el rol 'admin'
    const isAdmin = await req.permit.check({
      user: userId,
      action: 'assign_role', // acción especial que definimos, puede ser ficticia o real
      resource: 'system',    // recurso general, porque asignar rol no es sobre un perfil
    });

    if (!isAdmin) {
      return res.status(403).json({ message: "No tienes permiso para asignar roles." });
    }

    // Si tiene permiso, sigue al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Error en el middleware isAdmin:", error);
    res.status(500).json({ message: "Error verificando permisos." });
  }
}