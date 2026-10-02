import { useEffect } from "react";
import { useMeQuery } from "./api";
import { signedOut, userLoaded } from "./authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export function useRestoreSession() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const user = useAppSelector((s) => s.auth.user);

  const { data, error } = useMeQuery(undefined, {
    skip: !token || user !== null,
  });

  useEffect(() => {
    if (data) dispatch(userLoaded(data.user));
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      localStorage.removeItem("seatly.token");
      dispatch(signedOut());
    }
  }, [error, dispatch]);
}
