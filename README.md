# short-sha
Github action to that sets a short version of the github SHA as an environment variable.

## Basic usage
> Defaults to using the `GITHUB_SHA` value.
```
name: example-pipeline
on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      
      - name: Set SHORT_SHA
        uses: allenevans/short-sha@v1.0.0

      - name: Print short sha
        run: |
          echo "SHA_SHORT=${SHA_SHORT}"
```

## With parameters

| Param  | Description |
| ------ | ----------- |
| length | SHA length, default = 7 |
| name   | Name of the environment variable to set. Default = "SHORT_SHA" |
| offset | Where to start taking the substring of the sha. Default = 0. To start from the right, use a negative value e.g. -7 |
| sha    | Commit sha to be shortened. Default = "${GITHUB_SHA}" |

## Examples

> Using a different commit sha value
```
steps:
  - name: Set SHORT_SHA
    uses: allenevans/short-sha@v1.0.0
    with:
      sha: ${{ github.event.pull_request.head.sha }}
```

> Reference a different commit sha
```
steps:
  - uses: allenevans/short-sha@v1.0.0
    with:
      sha: ${{ github.event.pull_request.head.sha }}
```

> Last 7 characters of the commit SHA
```
steps:
  - uses: allenevans/short-sha@v1.0.0
    with:
      offset: -7
```

> Change the exported environment variable name
```
steps:
  - uses: allenevans/short-sha@v1.0.0
    with:
      name: sha7

  - name: Print short sha
    run: |
      echo "Short sha is ${SHA7}"
```
_Github reserve the prefix `GITHUB_` for environment variables._
