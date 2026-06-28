# One Todo

Do you know those times when you have a huge list of TODOs and you procrastinate them? This tries to solve it, with One Todo at a time you do not need to worry about that big goal, you just focus on the next obstacle ahead of you.

![Image of a terminal showing a demostration of the program running example.json](https://github.com/alvaromrveiga/one_todo/blob/2c7d8c7758567479fdb9bce5713cd84beba886ce/assets/demo.png)

To run:

1. Create your list of todos following the `example.json` file
    - `done` is optional
2. Call the program passing your file as a parameter

    ```bash
    bun run start your_list.json
    ```

    Or

    ```bash
    bun index.ts your_list.json
    ```
3. Press `Enter` or `Space` to complete the current TODO
    - Or press `CTRL + C` or `Q` to exit
4. Your file will be automatically modified when TODOs are completed

I hope you reach your goals!
