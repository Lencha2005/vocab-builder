// export const getStatistics = createAsyncThunk<
//   string[],
//   void,
//   { rejectValue: string }
// >('categories/getAll', async (_, thunkApi) => {
//   try {
//     const { data } = await authInstance.get<string[]>('/words/categories');
//     console.log('data: ', data);
//     return data;
//   } catch (error: unknown) {
//     return thunkApi.rejectWithValue(getErrorMessage(error));
//   }
// });

// export const addWordById = createAsyncThunk<
//   WordItem,
//   string,
//   { rejectValue: string }
// >('words/add', async (id, thunkApi) => {
//   try {
//     const { data } = await authInstance.post<WordItem>(`/words/add/${id}`);
//     return data;
//   } catch (error) {
//     return thunkApi.rejectWithValue(
//       error instanceof Error ? error.message : 'Unknown error'
//     );
//   }
// });
