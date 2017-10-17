import os
import xlwt
import csv
import math

# student list
students_lists = list()
# student name -> host link
studnets_link_dict = dict()
# library name -> library link
library_dict = dict()
# student name -> library
students_library_dict = dict()


extra_api_library_file = 'extra_api_list.csv'
judge_result = 'tech_judge_result_test.csv'
hosting_file = 'hosting.csv'

github_prefix = "https://github.com/goldironhack/2017-Purdue-UNAL-IronHack-"
github_suffix = "/blob/master/README.txt"

judger_number = 4

class XlsReport:
#    '''Excel报告接口'''
	def __init__(self,file_path):
		self.xls_workbook = None           #创建的Excel对象
		self.xls_file_path = file_path       #创建Excel的文件路径
		self.xls_worksheets = {}              #工作表的行列标记符{worksheet对象:{r:行,c:列}}
		self.xls_sheet_col_length = {}    #工作表的列宽{worksheet对象:{列1:宽度,列2:宽度...}}
		
	def xlsOpenWorkbook(self):
		'''创建一个Excel'''
		self.xls_workbook = xlwt.Workbook()
		
	def xlsAddWorksheet(self,sheet_name='sheet',r=0,c=0):
		'''
		创建一个工作表对象
		@parameter sheet_name:工作簿名称
		@parameter r:工作表的行
		@parameter c:工作表的列
		'''
		obj_worksheet = self.xls_workbook.add_sheet(sheet_name)   #创建工作表对象
		xls_worksheet = {}                                        #工作表的行列标记符
		xls_worksheet['r'] = r                                    #行标记符
		xls_worksheet['c'] = c                                    #列标记符
		self.xls_worksheets[obj_worksheet] = xls_worksheet
		self.xls_sheet_col_length[obj_worksheet] = {}
		return obj_worksheet
	
	def xlsCloseWorkbook(self,obj_worksheet):
		'''
		关闭Excel文件对象,保存Excel数据
		@parameter obj_worksheet:工作表对象
		'''
		#设置工作簿的列宽
		for c in self.xls_sheet_col_length[obj_worksheet]:
			if self.xls_sheet_col_length[obj_worksheet][c] < 10:
				obj_worksheet.col(c).width = 256*10
			elif self.xls_sheet_col_length[obj_worksheet][c] > 50:
				obj_worksheet.col(c).width = 256*50
			else:
				obj_worksheet.col(c).width = 256*(self.xls_sheet_col_length[obj_worksheet][c])
		#关闭工作表对象
		self.xls_workbook.save(self.xls_file_path)
	
	def addWorksheetTitle(self,obj_worksheet,titles=[],r=0,c=0):
		'''
		添加工作簿的标题
		@parameter obj_worksheet:工作表对象
		@parameter titles:标题
		@parameter r:工作表的行
		@parameter c:工作表的列
		'''
		#设置标题的样式
		style_title = xlwt.easyxf('pattern:pattern solid,fore_colour lime; font:height 200,bold on; align:horz center;')
		#写工作簿的标题
		for title in titles:
			obj_worksheet.write(r,c,title,style_title)
			c += 1
		#工作簿的行标记+1
		r += 1
		self.xls_worksheets[obj_worksheet]['r'] = r


	def appendWorksheetTemplate(self,obj_worksheet):   
		'''
		按行追加数据
		@parameter obj_worksheet:工作表对象
		@parameter datas:标题
		@parameter r:工作表的行
		@parameter c:工作表的列
		@parameter gold:0(不变/Pass),-1(变差/Fail),1(变好)
		''' 
		# text
		stylebox_black = xlwt.easyxf('font:height 200,color-index black; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		stylebox_black_bold = xlwt.easyxf('font:height 200,color-index black,bold true; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')    
		stylebox_red = xlwt.easyxf('font:height 200,color-index red; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		stylebox_red_bold = xlwt.easyxf('font:height 200,color-index red,bold true; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		
		# cell borders
		# not use right now
		tl = xlwt.easyxf('border: left thick, top thick')
		t = xlwt.easyxf('border: top thick')
		tr = xlwt.easyxf('border: right thick, top thick')
		r = xlwt.easyxf('border: right thick')
		br = xlwt.easyxf('border: right thick, bottom thick')
		b = xlwt.easyxf('border: bottom thick')
		bl = xlwt.easyxf('border: left thick, bottom thick')
		l = xlwt.easyxf('border: left thick')

		# cell size
		s_w = obj_worksheet.col(0).width
		s_h = obj_worksheet.row(0).height
		# col
		obj_worksheet.col(1).width = int(s_w * 1.5)
		obj_worksheet.col(2).width = int(s_w * 2.5)
		obj_worksheet.col(3).width = int(s_w * 3.5)
		obj_worksheet.col(4).width = int(s_w * 2)
		obj_worksheet.col(5).width = int(s_w * 2.5)
		obj_worksheet.col(6).width = int(s_w * 3.5)
		# row
		obj_worksheet.row(4).height_mismatch = 1
		obj_worksheet.row(4).height = int(s_h * 3)
		obj_worksheet.row(7).height_mismatch = 1
		obj_worksheet.row(7).height = int(s_h * 2)
		obj_worksheet.row(8).height_mismatch = 1
		obj_worksheet.row(8).height = int(s_h * 3)
		obj_worksheet.row(9).height_mismatch = 1
		obj_worksheet.row(9).height = int(s_h * 3)
		obj_worksheet.row(10).height_mismatch = 1
		obj_worksheet.row(10).height = int(s_h * 4)
		obj_worksheet.row(11).height_mismatch = 1
		obj_worksheet.row(11).height = int(s_h * 7)
		obj_worksheet.row(12).height_mismatch = 1
		obj_worksheet.row(12).height = int(s_h * 1)
		obj_worksheet.row(13).height_mismatch = 1
		obj_worksheet.row(13).height = int(s_h * 2)
		obj_worksheet.row(14).height_mismatch = 1
		obj_worksheet.row(14).height = int(s_h * 2)
		obj_worksheet.row(15).height_mismatch = 1
		obj_worksheet.row(15).height = int(s_h * 2)
		obj_worksheet.row(16).height_mismatch = 1
		obj_worksheet.row(16).height = int(s_h * 4)
		obj_worksheet.row(17).height_mismatch = 1
		obj_worksheet.row(17).height = int(s_h * 3)
		obj_worksheet.row(18).height_mismatch = 1
		obj_worksheet.row(18).height = int(s_h * 4)
		obj_worksheet.row(19).height_mismatch = 1
		obj_worksheet.row(19).height = int(s_h * 1)
		obj_worksheet.row(20).height_mismatch = 1
		obj_worksheet.row(20).height = int(s_h * 16)


		obj_worksheet.write(2, 1, "GitHub Name", stylebox_black_bold)  
		obj_worksheet.write(3, 1, "Readme File link", stylebox_black_bold)
		obj_worksheet.write(4, 1, "Mashup Link (copy/paste into your browser", stylebox_black_bold)
		obj_worksheet.write(4, 3, "JUDGES, please use google Chrom at 100% zoom level.", stylebox_black_bold)
		obj_worksheet.write(5, 1, "Dimension", stylebox_black_bold)
		obj_worksheet.write(5, 2, "Description", stylebox_black_bold)
		obj_worksheet.write_merge(5, 5, 3, 4, "Performance", stylebox_black_bold)
		obj_worksheet.write_merge(6, 11, 1, 1, "User requirements", stylebox_black_bold)
		obj_worksheet.write_merge(6, 11, 2, 2, "1. Does the app improve the decisions of a target audience? \n2. Does it meet the minimal functional requirements presented in the challenge question?", stylebox_black)
		obj_worksheet.write(6, 3, "POINT-CRITERIA:", stylebox_black_bold)
		obj_worksheet.write(6, 4, "YES = 1  NO = 0", stylebox_red_bold)
		obj_worksheet.write(7, 3, "The application/mash-up is developed for new students moving to New York City, NY.", stylebox_black)
		obj_worksheet.write(8, 3, "The application/mash-up shows at least 2 renting options in New York City, NY near NYU Stern School of Business.", stylebox_black)
		obj_worksheet.write(9, 3, "The application/mash-up shows the safest renting option in New York City, NY near NYU Stern School of Business.", stylebox_black)
		obj_worksheet.write(10, 3, "The application/mash-up shows the renting option with the cheapest rental price (in dollar value) in New York City, NY near NYU Stern School of Business.", stylebox_black)
		obj_worksheet.write(11, 3, "The application/mash-up has a specific feature that allows new students to compare renting options near NYU Stern School of Business against more than one criteria (e.g. distance to university, proximity to parks/greenery, access to restaurants/bars, proximity to sport facilities, transportation, etc.).", stylebox_black)
		obj_worksheet.write_merge(12, 18, 1, 1, "Usability", stylebox_black_bold)
		obj_worksheet.write_merge(12, 18, 2, 2, "(1) System affordance: Does the application offer recognizable elements and interactions that can be understood by the user? (2) Cognitive workload: Is the number of alternative options from which the user can choose appropriate? (3) Functionality: Does the mash up execute commands how the user expects it to?", stylebox_black)
		obj_worksheet.write(12, 3, "POINT-CRITERIA:", stylebox_black_bold)
		obj_worksheet.write(12, 4, "WORST=0 to BEST=3", stylebox_red_bold)
		obj_worksheet.write(13, 3, "The page layout design in the app/mash-up is efficient (design). ", stylebox_black)
		obj_worksheet.write(14, 3, "The user interface offers minimal necessary actions to find an option (functionality).", stylebox_black)
		obj_worksheet.write(15, 3, "The grouping of elements in the App/mash-up is effective (design).", stylebox_black)
		obj_worksheet.write(16, 3, "The user interface offers perceivable interactions (links, clicks, sliders, etc.) via its visual elements that lead to expected results (functionality).", stylebox_black)
		obj_worksheet.write(17, 3, "The interface reduces cognitive load, e.g., by color coding, icons and visual features that change after being clicked (design).", stylebox_black)
		obj_worksheet.write(18, 3, "The comparison feature: The user does not have to memorize a lot of information to compare alternative renting options (functionality). ", stylebox_black)
		obj_worksheet.write_merge(19, 26, 1, 1, "Novelty", stylebox_black_bold)
		obj_worksheet.write_merge(19, 26, 2, 2, "This criterion evaluates if the app is different from other apps: (1) How relevant is the data for the App? (2) How well is the data designed visually?, and (3) How well can users interact with the data?", stylebox_black)
		obj_worksheet.write(19, 3, "POINT-CRITERIA:", stylebox_black_bold)
		obj_worksheet.write_merge(19, 19, 4, 6, "WORST=0 to BEST=3", stylebox_red_bold)
		obj_worksheet.write(20, 4, "(1) How relevant is the data for the App? 0 = Irrelevant to users: exclude. \n2 = Interesting, but does not add much value in making a decision\n1 = Relevant: helps users choose where to live\n3 = Extremly relevant: users cannot complete their task without this kind of a dataset", stylebox_black)
		obj_worksheet.write(20, 5, "(2) How well is the data designed visually? 0 = The data is not visible or accessible to users.\n1 = The datapoints have a visual or textual representaiton (e.g., pin on a map; data table).\n2 = Datapoints are aggregated into standard graphs (e.g., bar or pie charts, line graphs, scatterplots).\n3 = Visualization methods beyond standard charts that cannot be found in Excel (e.g., heatmap, tree map, network, polar grid, sankey, radar).", stylebox_black)
		obj_worksheet.write(20, 6, "(3) How well can users interact with the data? 0 = The data has not been visualized AND it cannot be interacted with.\n1 = The graph or visualization is static and cannot be clicked, draged or tapped on/off, etc. The data has been visualized but users cannot interact with it (no user control).\n2 = User has binary control (e.g., on/off) over the data. The user can choose to visualize it (to compare it with other datasets), or turn it off.\n3 = User can manipulate the visualization, such as rank a table by different columns (e.g., cheapest, distance to university, proximity to a gym, etc.), filter data points by criteria (e.g., only show options in the walking distance, only show options that are below $700per month, only show options that are pet friendly, etc.)", stylebox_black)

	def appendWorksheetData(self, obj_worksheet, student):
		# text
		stylebox_black = xlwt.easyxf('font:height 200,color-index black; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		stylebox_black_bold = xlwt.easyxf('font:height 200,color-index black,bold true; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')    
		stylebox_red = xlwt.easyxf('font:height 200,color-index red; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		stylebox_red_bold = xlwt.easyxf('font:height 200,color-index red,bold true; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')

		obj_worksheet.write(2, 2, student, stylebox_black)
		obj_worksheet.write(3, 2, xlwt.Formula('HYPERLINK("' + github_prefix + student + github_suffix + '";' + '"link_to_readme"' + ')'), stylebox_black)
		obj_worksheet.write(4, 2, xlwt.Formula('HYPERLINK("' + studnets_link_dict[student] + '";' + '"link_to_application"' + ')'), stylebox_black)
		index = 21
		for library in students_library_dict[student].split(','):
			library = library.strip()
			if library == '':
				continue
			obj_worksheet.write(index, 3, xlwt.Formula('HYPERLINK("' + library_dict[library] +'";"' + library + '")'))
			index += 1

	def test_appendWorksheetData(self, obj_worksheet, student):

		# text
		stylebox_black = xlwt.easyxf('font:height 200,color-index black; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		stylebox_black_bold = xlwt.easyxf('font:height 200,color-index black,bold true; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')    
		stylebox_red = xlwt.easyxf('font:height 200,color-index red; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')
		stylebox_red_bold = xlwt.easyxf('font:height 200,color-index red,bold true; borders:left 1,right 1,top 1,bottom 1; align:horiz left,wrap 1')

		a = "www.google.com"
		students_library_dict['pl'] = "aaa, sss, dd, "
		library_dict['aaa'] = 'http://www.baidu.com'
		library_dict['sss'] = 'http://www.gmail.com'
		library_dict['dd'] = 'http://www.google.com'
		obj_worksheet.write(2, 2, student, stylebox_black)
		obj_worksheet.write(3, 2, xlwt.Formula('HYPERLINK("' + github_prefix + student + github_suffix + '";' + '"link_to_readme"' + ')'), stylebox_black)
		obj_worksheet.write(4, 2, xlwt.Formula('HYPERLINK("' + a + '";' + '"link_to_readme"' + ')'), stylebox_black)
		index = 21
		for library in students_library_dict[student].split(','):
			library = library.strip()
			if library == '':
				continue
			obj_worksheet.write(index, 3, xlwt.Formula('HYPERLINK("' + library_dict[library] +'";"' + library + '")'))
			index += 1



def read_data():
	with open(extra_api_library_file) as extra_api_list_f:
		extra_api_reader = csv.reader(extra_api_list_f)
		for row in extra_api_reader:
			library_dict[row[1]] = row[2]
	with open(judge_result) as judge_result_f:
		judge_reader = csv.reader(judge_result_f)
		for row in judge_reader:
			students_library_dict[row[0]] = row[6]
	with open(hosting_file) as hosting_f:
		hosting_reader = csv.reader(hosting_f)
		for row in hosting_reader:
			studnets_link_dict[row[0]] = row[1]
			students_lists.append(row[0])


def create_judging_sheet():
	length = len(students_lists)
	index_stu = 0
	index_sheets = 0
	#length = 10
	size = math.ceil(length / judger_number)
	size_sheets = list()
	while length > 0:
		size_sheets.append(size)
		length -= size
		if length < size:
			size_sheets.append(length)
			break
	print(length)
	print(size_sheets)
	for sheets in size_sheets:
		file_path = os.path.join(os.getcwd(), str(index_sheets) + '.xls')
		xls = XlsReport(file_path)
		xls.xlsOpenWorkbook()
		for i in range(0, sheets):
			sheet = xls.xlsAddWorksheet(students_lists[index_stu])
			#sheet = xls.xlsAddWorksheet("test" + str(index_stu))
			xls.appendWorksheetTemplate(sheet)
			xls.appendWorksheetData(sheet, students_lists[index_stu])
			xls.xlsCloseWorkbook(sheet)
			index_stu += 1
		index_sheets += 1

#self test           
if __name__ == '__main__':
	read_data()
	create_judging_sheet()
	'''
	#read_data()
	#文件的后缀名为xls
	file_path = os.path.join(os.getcwd(),'test.xls')
	xls = XlsReport(file_path)
	#创建Excel对象
	xls.xlsOpenWorkbook()
	#添加工作对象
	sheet_names = ['sheet1','sheet2','sheet3']
	for sheet_name in sheet_names:
		sheet = xls.xlsAddWorksheet(sheet_name)
		#Excel的标题
		#xls.addWorksheetTitle(sheet,['测试用例编号','测试用例名称','测试结果','备注'])
		#Excel的数据
		xls.appendWorksheetTemplate(sheet)
		#xls.appendWorksheetData(sheet,[1002,'test2','Fail','失败'],gold=-1)
		#xls.appendWorksheetData(sheet,[1003,'test3','Pass','调优'],gold=1)
		xls.test_appendWorksheetData(sheet, 'pl')
		xls.xlsCloseWorkbook(sheet)
	'''