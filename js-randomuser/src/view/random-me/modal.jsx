import React from "react";
import { Box, Button, Typography, Modal, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};
export default function RandomMeModal(props) {
  const { state, onShow, onClose } = props;

  return (
    <Modal open={onShow} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Grid sx={style} alignItems="center" justifyContent="center" textAlign="center">
        <Card sx={{ width: { xs: "100%", md: "100%" } }}>
          <CardActionArea>
            <CardMedia component="img" image={state.picture.large} alt="random user" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {state.name.first} {state.name.last}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {state.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Age: {state.dob.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {state.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cell: {state.cell}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {state.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                City: {state.location.city}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Modal>
  );
}
