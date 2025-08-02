import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context, location }) => {
    const { store, queryClient } = context;
    const { isAuthenticated } = store.getState().auth;

    if (isAuthenticated) {
        return;
    }

    try {
        const user = await queryClient.fetchQuery({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });

        if (user) {
            store.dispatch(login(user));
            return;
        }
    } catch (error) {
        // User is not logged in
    }

    throw redirect({
        to: "/auth",
        search: {
            redirect: location.pathname,
        },
    });
};
