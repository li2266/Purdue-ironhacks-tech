import os
import github
from github import Github
import shutil
import subprocess
import csv
import re
import time

repository_folder_name = "repository"
repository_prefix = "2017-Purdue-UNAL-IronHack-"
github_username = "RCODI"
github_psw = "GoBoilers2015!"
github_org = "blackironhack"
input_file_name = "../user_test.csv"
output_file_name = "tech_judge_result_test.csv"
name_hid_dict = dict()

def clone_repo():
	gh = Github(github_username, github_psw)
	gh_org = gh.get_organization(github_org);
	if os.path.exists(repository_folder_name) == False:
		os.mkdir(repository_folder_name)
	os.chdir(repository_folder_name)

	with open(input_file_name) as input_file:
		input_file_reader = csv.reader(input_file)
		for row in input_file_reader:
			username = row[0]
			name_hid_dict[username] = row[1]
			repository_name = repository_prefix + username
			user_repository = None
			try:
				user_repository = gh_org.get_repo(repository_name)
			except:
				print("ERROR: there is no repo named {0}".format(repository_name))
			if user_repository != None:
				subprocess.call(["git", "clone", user_repository.clone_url])
				print("cloned repo: {0}".format(repository_name))
			else:
				print("fail to cloned repo: {0}".format(repository_name))

def tech_judge():
	os.chdir(repository_folder_name)
	# judge flags
	flag_required_dataset = 0
	flag_extra_dataset = 0
	flag_location = 0
	flag_js = 0
	flag_map = 0
	flag_chart = 0
	flag_input = 0
	flag_mashup = 0
	flag_readme = 0
	flag_readme_keyword = 0
	flag_library = 0

	chart_list = ["d3", "arbor", "c3", "sigma"]

	output_list = list()

	required_api_list = list()
	for str_api in open("../required_api_list.csv"):
		required_api_list.append(str_api.strip())

	extra_api_list = list()
	extra_api_name_list = list()
	with open("../extra_api_list.csv") as extra_file:
		extra_api_reader = csv.reader(extra_file)
		for str_api in extra_api_reader:
			extra_api_list.append(str_api[0].strip())
			extra_api_name_list.append(str_api[1].strip())

	library_list = list()
	library_name_list = list()
	with open("../library.csv") as library_file:
		library_reader = csv.reader(library_file)
		for library in library_reader:
			library_list.append(library[0].strip())
			# TODO add library
			library_name_list.append(library[0].strip())

	judge_result = list()
	user_record = list()
	user_record.append("username")
	user_record.append("hack id")
	user_record.append("repo name")
	user_record.append("time")
	user_record.append("climate dataset")
	user_record.append("extra dataset used")
	user_record.append("extra dataset list")
	user_record.append("google api")
	user_record.append("location")
	user_record.append("using JS")
	user_record.append("mashup")
	user_record.append("readme")
	user_record.append("good readme")
	user_record.append("chart")
	user_record.append("if use library")
	user_record.append("library list")
	output_list.append(user_record)

	extra_api_name_string = ''
	library_list_string = ''

	for user in open(input_file_name):
		user_record = list()
		
		username = user.strip()
		user_record.append(username)
		#user_record.append(name_hid_dict[username])
		user_record.append(2)

		repository_name = repository_prefix + username
		user_record.append(repository_name)

		user_record.append(time.asctime(time.localtime(time.time())))

		list_files = os.walk(repository_name)
		for root, dirs, files in list_files:
			for file in files:
				file = os.path.join(root, file)
				try:
					file_object = open(file)
				except:
					continue
				# for readme file
				if file.find("README.md") != -1:
					flag_readme = 1
					flag_readme_keyword = 1
					try:
						file_content = file_object.read();
						if file_content.find("generated by Ironhacks Team automaticly") > -1:
							flag_readme = 0
							flag_readme_keyword = 0
						#if re.search("keyword", file_content, re.IGNORECASE) or re.search("key word", file_content, re.IGNORECASE):
						# for key word in readme file
						#	flag_readme_keyword = 1
					except:
						pass
				if file.find(".js") == -1 and file.find(".jsx") == -1 and file.find(".ts") == -1 and file.find(".html") == -1 and file.find(".py") == -1 and file.find(".htm") == -1 and file.find(".py") == -1 and file.find(".shtml") == -1:
					continue
					# for using js
				if file.find(".js") != -1:
					flag_js = 1
				try:
					file_content = file_object.read();
					#for required api
					for api in required_api_list:
						if file_content.find(api) > -1:
							flag_required_dataset = 1
					# for extra api
					for api in extra_api_list:
						if file_content.find(api) > -1:
							flag_extra_dataset += 1
							extra_api_name_string = extra_api_name_string + extra_api_name_list[extra_api_list.index(api)] + ", "
					# for using js
					if file.find(".html") != -1:
						if file_content.find("<script>") > -1 or file_content.find("<script type=\"text/javascript\">") or file_content.find("<script type=\'text/javascript\''>"):
							flag_js = 1
					# for map
					if file_content.find("initMap") > -1:
						flag_map = 1
					# for bogota
					if file_content.find("41.870") > -1: 
					# for platzi
					#if file_content.find("40.729") > -1:
						flag_location = 1
					if file_content.find("<input") > -1:
						flag_input = 1
					for chart in chart_list:
						if file_content.find(chart):
							flag_chart = 1
							break

					#for library
					tmp_set = set()
					for library in library_list:
						if file_content.find(library) > -1:
							tmp_set.add(library_name_list[library_list.index(library)])
					for lib in tmp_set:
						library_list_string = library_list_string + lib + ','


							#library_list_string = library_list_string + library_name_list[library_list.index(library)] + ','
					if library_list_string != '':
						flag_library = 1

				except:
					pass

		if flag_chart == 1 and flag_input == 1 and flag_map == 1:
			flag_mashup = 1
		user_record.append(flag_required_dataset)
		user_record.append(flag_extra_dataset)
		user_record.append(extra_api_name_string)
		user_record.append(flag_map)
		user_record.append(flag_location)
		user_record.append(flag_js)
		user_record.append(flag_mashup)
		user_record.append(flag_readme)
		user_record.append(flag_readme_keyword)
		user_record.append(flag_chart)
		user_record.append(flag_library)
		user_record.append(library_list_string)
		output_list.append(user_record)

		print("FINISH: {0}".format(repository_name))

		flag_required_dataset = 0
		flag_extra_dataset = 0
		flag_location = 0
		flag_js = 0
		flag_map = 0
		flag_chart = 0
		flag_input = 0
		flag_mashup = 0
		flag_readme = 0
		flag_readme_keyword = 0
		flag_library = 0
		extra_api_name_string = ''
		library_list_string = ''

	with open(output_file_name, "w") as f:
		writer = csv.writer(f)
		writer.writerows(output_list)


if __name__ == '__main__':
	#clone_repo()
	tech_judge()
