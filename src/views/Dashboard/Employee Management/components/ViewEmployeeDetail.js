import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { api } from "configs";
import useDateTime from "hooks/useDateTime";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ViewEmployeeDetail = ({ isOpen, onOpen, onClose, data }) => {
  const btnRef = React.useRef();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { dateFormat } = useDateTime();
  const [editToggler, setEditToggler] = useState(false);
  const editTogglerHandler = () => {
    setEditToggler(!editToggler);
  };

  const onSubmit = async (data) => {
    try {
      const res = await api.patch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DrawerCloseButton /> <DrawerHeader> User Detail</DrawerHeader>
              <DrawerBody>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>{" "}
                <Text>{data?.fullName}</Text>
                <FormLabel mt={4} htmlFor="userType">
                  User Name
                </FormLabel>{" "}
                {editToggler ? (
                  <>
                    <Input
                      defaultValue={data?.username}
                      placeholder="userName"
                      {...register("username", {
                        required: "This is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                  </>
                ) : (
                  <Text>{data?.username}</Text>
                )}
                <FormLabel mt={4} htmlFor="userType">
                  User Type
                </FormLabel>{" "}
                {editToggler ? (
                  <>
                    <Select
                      defaultValue={data?.userType}
                      {...register("userType", {
                        required: "This is required",
                      })}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                  </>
                ) : (
                  <Text>{data?.type}</Text>
                )}
                <FormLabel mt={4} htmlFor="email">
                  Email
                </FormLabel>{" "}
                <Text>{data?.email}</Text>
                <FormLabel mt={4} htmlFor="">
                  Created at
                  <Text>{dateFormat(data?.createdAt)}</Text>
                </FormLabel>{" "}
              </DrawerBody>
              <DrawerFooter gap={6}>
                {editToggler ? (
                  <Button onClick={editTogglerHandler}>Cancel</Button>
                ) : (
                  <Button onClick={editTogglerHandler}>Edit</Button>
                )}

                <Button colorScheme="orange" type="submit">
                  Save
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>{" "}
        </Drawer>
      </>
    </>
  );
};

export default ViewEmployeeDetail;
