#!/usr/bin/env python3
"""Novel data update module."""

import os
import sys
import yaml
import json


DATA_FILE = 'novels.yml'
OUTPUT_FILE = 'assets/novels.json'


def conv():
    tmp = []
    return tmp


def getter(fname: str):
    assert isinstance(fname, str)

    if not os.path.exists(fname):
        raise FileExistsError(fname)

    with open(DATA_FILE, 'r') as file:
        tmp = yaml.safe_load(file)
        return json.dumps(tmp, indent=2, ensure_ascii=False)


def writer(fname: str, data):
    assert isinstance(fname, str)

    with open(OUTPUT_FILE, 'w') as file:
        file.write(data)


def main(argv: list):
    data_file = f"{argv[1]}.yml" if len(argv) > 1 and argv[1] else DATA_FILE
    output_file = f"{argv[1]}.json" if len(argv) > 1 and argv[1] else OUTPUT_FILE
    data = getter(data_file)
    writer(output_file, data)
    print(f"> updated {data_file} data to json!")
    return os.EX_OK


if __name__ == '__main__':
    sys.exit(main(sys.argv))
