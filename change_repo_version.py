import os
import github
from github import Github
import shutil
import subprocess
import csv
import re
import time

repository_folder_name = "repository"
deadline = "\"2017-04-27T01:00:00\""
# function for analyze the log
# It could be after, since
fun = "--before"
para = fun + "=" + deadline


def change_version():
	os.chdir(repository_folder_name)
	curdir = os.getcwd()
	for filename in os.listdir():
		if os.path.isfile(os.path.join(curdir, filename)):
			continue
		print("{0}".format("for"+filename))
		os.chdir(filename)
		try:
			out_bytes = subprocess.check_output(["git", "log", para])
			out_text = out_bytes.decode('utf-8')
		except:
			pass
		try:
			version = out_text.split("\n")[0].split(" ")[1]
			subprocess.call(["git", "checkout", version])
		except:
			pass
		os.chdir(curdir)

if __name__ == '__main__':
	change_version()