#!/usr/bin/env python3
"""Novel data update module."""

import os
import sys
import yaml
import json


DATA_FILE = 'novels.yml'
OUTPUT_FILE = 'novels.json'


def conv():
    tmp = []
    return tmp


def getter():
    with open(DATA_FILE, 'r') as file:
        tmp = yaml.safe_load(file)
        return json.dumps(tmp, indent=2, ensure_ascii=False)


def writer(data):
    with open(OUTPUT_FILE, 'w') as file:
        file.write(data)


def main():
    data = getter()
    writer(data)
    print('> updated novels data!')
    return os.EX_OK


if __name__ == '__main__':
    sys.exit(main())
