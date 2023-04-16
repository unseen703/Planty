import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { getPosts ,getPostsBySearch} from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input";
// import useStyles
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
// import memories from "../../images/memories.png";
const Home = () => {
  const classes = useStyles();
  const histrory = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currId, setCurrId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("get podts");
    dispatch(getPosts());
  }, [currId, dispatch]);
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatcdih -> fetch searched posts
      dispatch(getPostsBySearch({search, tags:tags.join(",")}));

      histrory.push(`/posts/search?searchQuery= ${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      histrory.push(`/`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPost();
      // histrory.push(`/search/${searchQuery}`);
    }
  };
  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid key="1" item xs={12} sm={6} md={9}>
              <Posts setCurrId={setCurrId} />
            </Grid>
            <Grid key="2" item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  className={classes.search}
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <ChipInput
                  name="tags"
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  // variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
              <Form currId={currId} setCurrId={setCurrId} />
              <Paper elevation={6}>
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
