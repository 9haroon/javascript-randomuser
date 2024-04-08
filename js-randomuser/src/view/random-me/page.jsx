import React, { useState, useEffect } from "react";
import { Grid, Box, Card, CardActionArea, Typography, CardMedia, CardContent, TablePagination } from "@mui/material";
import TextField from "@mui/material/TextField";

import RandomMeModal from "./modal";
import { RandomMeModel } from "../../models";
const randomme_model = new RandomMeModel();

export default function Page() {
  const [state, setState] = useState({
    random_user: [],
    page: 0,
    results: 10,
    seed: "abc",
    inc: "",
    item_modal: {},
    showModal: false,
    loading: true,
    age_start: 0,
    age_end: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { page, results, seed, inc } = state;
    const params = { page: page + 1, results, seed, inc };
    const random = await randomme_model.getRandomMe(params);
    setState({
      ...state,
      random_user: random.results,
      showModal: false,
      loading: false,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      showModal: false,
    });
  };

  const handleChangePage = async (event, newPage) => {
    const { page, results, seed, inc } = state;
    const params = { page: newPage + 1, results, seed, inc };
    const random = await randomme_model.getRandomMe(params);
    setState({
      ...state,
      page: newPage,
      random_user: random.results,
      loading: false,
    });
  };

  const handleChangeRowsPerPage = async (event) => {
    const { page, results, seed, inc } = state;
    const params = { page: 1, results: parseInt(event.target.value, 10), seed, inc };
    const random = await randomme_model.getRandomMe(params);
    setState({
      ...state,
      results: parseInt(event.target.value, 10),
      page: 0,
      random_user: random.results,
      loading: false,
    });
  };

  const itemShowGrid = (item, index) => {
    return (
      <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
        <Card
          sx={{ maxWidth: 345 }}
          onClick={(e) => {
            setState({
              ...state,
              item_modal: item,
              showModal: true,
            });
          }}
        >
          <CardActionArea>
            <CardMedia component="img" height="140" image={item.picture.large} alt="random user" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name.first} {item.name.last}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AGE: {item.dob.age}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  return (
    <Box component="main" sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" textAlign="center">
        {state.random_user ? (
          <>
            <Grid container spacing={2} sx={{ my: 5, p: 2 }}>
              <Grid item xs={5} sm={5} md={5} lg={5} sx={{ textAlign: "right" }}>
                <TextField
                  type="text"
                  id="search"
                  label="อายุเริ่ม"
                  placeholder="ตัวเลข"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    setState({
                      ...state,
                      age_start: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} sx={{ textAlign: "center" }}>
                ถึง
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} sx={{ textAlign: "left" }}>
                <TextField
                  type="text"
                  id="search"
                  label="อายุสิ้นสุด"
                  placeholder="ตัวเลข"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    setState({
                      ...state,
                      age_end: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            {state.random_user
              .filter((person) => {
                const age = person.dob.age;
                if (state.age_start === 0 && state.age_end === 0) {
                  return true;
                } else if (state.age_start > 0 && state.age_end > 0) {
                  return age >= state.age_start && age <= state.age_end;
                } else if (state.age_start > 0) {
                  return age >= state.age_start;
                } else if (state.age_end > 0) {
                  return age <= state.age_end;
                }
                return true;
              })
              .map((item, index) => itemShowGrid(item, index))}
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 5, display: "flex", justifyContent: "center" }}>
              <TablePagination
                component="div"
                count={100}
                page={state.page}
                onPageChange={handleChangePage}
                rowsPerPage={state.results}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </>
        ) : null}
      </Grid>
      {state.showModal && <RandomMeModal state={state.item_modal} onShow={state.showModal} onClose={handleClose} />}
    </Box>
  );
}
