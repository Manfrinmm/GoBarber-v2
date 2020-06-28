import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";

import { useAuth, AuthProvider } from "../../hooks/auth";
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe("Auth hook", () => {
  const apiResponse = {
    user: {
      id: "a680f968-d685-4e35-92da-007c278cc4c9",
      name: "Matheus Menezes Manfrin",
      email: "matheus_mm1232@hotmail.com",
    },
    token: "eyJhbGciOiJIU",
  };

  it("should be able to sign in", async () => {
    apiMock.onPost("/sessions").reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: "matheus_mm1232@hotmail.com",
      password: "233",
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      "@GoBarber:user",
      JSON.stringify(apiResponse.user),
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      "@GoBarber:token",
      apiResponse.token,
    );

    expect(result.current.user.email).toEqual("matheus_mm1232@hotmail.com");
  });

  it("should restore saved data from storage when auth inits", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(key => {
      switch (key) {
        case "@GoBarber:token":
          return apiResponse.token;
        case "@GoBarber:user":
          return JSON.stringify(apiResponse.user);

        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual(apiResponse.user.email);
  });

  it("should be able to sign out", async () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(key => {
      switch (key) {
        case "@GoBarber:token":
          return apiResponse.token;
        case "@GoBarber:user":
          return JSON.stringify(apiResponse.user);

        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
  });

  it("should be able to update user data", async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      ...apiResponse.user,
      avatar_url: "image-teste.jpg",
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(result.current.user).toEqual(user);

    expect(setItemSpy).toHaveBeenCalledWith(
      "@GoBarber:user",
      JSON.stringify(user),
    );
  });
});
